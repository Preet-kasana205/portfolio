"""
Tests for the portfolio FastAPI backend.

Run with:
    pip install pytest httpx
    pytest tests/ -v
"""

import os
import pytest
from unittest.mock import patch, MagicMock

# Set required env before importing the app
os.environ.setdefault("GEMINI_API_KEY", "test-key-placeholder")
os.environ.setdefault("ALLOWED_ORIGINS", "http://localhost:5173")

from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


# ---------------------------------------------------------------------------
# Health check
# ---------------------------------------------------------------------------

class TestHealth:
    def test_health_returns_200(self):
        r = client.get("/")
        assert r.status_code == 200

    def test_health_body(self):
        r = client.get("/")
        data = r.json()
        assert data["status"] == "ok"
        assert "model" in data
        assert "timestamp" in data

    def test_health_no_api_key_exposed(self):
        r = client.get("/")
        text = r.text
        # Should never return the API key value
        assert "test-key-placeholder" not in text
        assert "GEMINI_API_KEY" not in text

    def test_api_health_route(self):
        r = client.get("/api/health")
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "ok"
        assert "model" in data


# ---------------------------------------------------------------------------
# Request validation
# ---------------------------------------------------------------------------

class TestChatValidation:
    def test_empty_message_rejected(self):
        r = client.post("/api/chat", json={"message": ""})
        assert r.status_code == 422

    def test_whitespace_only_rejected(self):
        r = client.post("/api/chat", json={"message": "   "})
        assert r.status_code == 422

    def test_message_too_long_rejected(self):
        r = client.post("/api/chat", json={"message": "x" * 1001})
        assert r.status_code == 422

    def test_missing_message_field_rejected(self):
        r = client.post("/api/chat", json={})
        assert r.status_code == 422

    def test_valid_message_passes_validation(self):
        """Mocks the genai client so we don't need a real API key."""
        mock_response = MagicMock()
        mock_response.text = "This is a test response from the AI assistant."

        with patch("main.get_genai_client") as mock_client_fn:
            mock_client = MagicMock()
            mock_client.models.generate_content.return_value = mock_response
            mock_client_fn.return_value = mock_client

            r = client.post("/api/chat", json={"message": "Tell me about Preet's projects."})
            assert r.status_code == 200
            data = r.json()
            assert "reply" in data
            assert len(data["reply"]) > 0


# ---------------------------------------------------------------------------
# Error handling — no secrets or stack traces in responses
# ---------------------------------------------------------------------------

class TestErrorHandling:
    def test_no_stack_trace_on_error(self):
        """When the model call fails, no traceback should reach the client."""
        with patch("main.get_genai_client") as mock_fn:
            mock_fn.side_effect = RuntimeError("Simulated internal failure")
            r = client.post("/api/chat", json={"message": "Hello"})
            assert r.status_code in (502, 503)
            body = r.text
            assert "Traceback" not in body
            assert "RuntimeError" not in body

    def test_model_error_returns_user_friendly_message(self):
        mock_error = Exception("Quota exceeded — do not expose this to clients")
        with patch("main.get_genai_client") as mock_fn:
            mock_client = MagicMock()
            mock_client.models.generate_content.side_effect = mock_error
            mock_fn.return_value = mock_client

            r = client.post("/api/chat", json={"message": "Hello"})
            assert r.status_code == 502
            data = r.json()
            # The raw exception message must NOT be in the response
            assert "Quota exceeded" not in data.get("detail", "")
            assert "do not expose" not in data.get("detail", "")

    def test_api_key_not_in_error_response(self):
        with patch("main.get_genai_client") as mock_fn:
            mock_fn.side_effect = RuntimeError("GEMINI_API_KEY=secret123")
            r = client.post("/api/chat", json={"message": "Hello"})
            assert "secret123" not in r.text
            assert "GEMINI_API_KEY" not in r.text


# ---------------------------------------------------------------------------
# CORS — must not allow all origins
# ---------------------------------------------------------------------------

class TestCORS:
    def test_allowed_origin_passes(self):
        r = client.get("/", headers={"Origin": "http://localhost:5173"})
        assert r.status_code == 200

    def test_response_contract(self):
        """Chat endpoint should return a 'reply' field."""
        mock_response = MagicMock()
        mock_response.text = "Test reply"
        with patch("main.get_genai_client") as mock_fn:
            mock_client = MagicMock()
            mock_client.models.generate_content.return_value = mock_response
            mock_fn.return_value = mock_client
            r = client.post("/api/chat", json={"message": "What is the UEBA project?"})
            assert r.status_code == 200
            assert "reply" in r.json()
