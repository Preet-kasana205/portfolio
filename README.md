# Preet Kasana — Portfolio

React + Vite frontend with a FastAPI backend for the portfolio AI assistant. The assistant uses the Google Gemini API; it does not use Gemma.

## Requirements

- Node.js 20.19+ (or 22.12+) and npm
- Python 3.10+
- A Google AI Studio API key for real AI responses: https://aistudio.google.com/app/apikey

## 1. Configure the backend

Open PowerShell in the project folder, then run:

```powershell
cd backend
Copy-Item .env.example .env
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

Open `backend/.env` in a text editor and replace the placeholder value for `GEMINI_API_KEY` with your own key. Do not paste the key into chat, source code, or GitHub. The backend loads `backend/.env` automatically.

Start FastAPI from the `backend` directory:

```powershell
python -m uvicorn main:app --reload --port 8000
```

Check the backend at http://127.0.0.1:8000/ or open API docs at http://127.0.0.1:8000/docs. The health endpoint confirms that the server is running, not that the API key or model call is valid.

If PowerShell blocks virtual-environment activation, you can run the environment's Python directly instead:

```powershell
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
.\.venv\Scripts\python.exe -m uvicorn main:app --reload --port 8000
```

## 2. Start the frontend

Open a second PowerShell terminal in the project root (the folder containing `package.json`):

```powershell
npm install
npm run dev
```

Open the local URL Vite prints, normally http://localhost:5173. During local development, the frontend uses Vite's `/api` proxy to forward chat and health requests to `http://localhost:8000`; leave `VITE_BACKEND_URL` empty.

For a separately deployed backend, set `VITE_BACKEND_URL` to its public base URL in `.env.local` and add your frontend origin to the backend's `ALLOWED_ORIGINS`. Rebuild the frontend after changing Vite environment variables.

## 3. Verify the AI assistant

1. Confirm the FastAPI terminal is running without startup errors.
2. Visit http://127.0.0.1:8000/api/health. This checks server availability only.
3. Open the portfolio and ask the AI assistant a question about a project.
4. If it fails, inspect the FastAPI terminal for a redacted error. Never share your API key. A successful health check alone does not prove the model API call works.

## Tests and build

Backend tests (from `backend` after installing requirements; install `pytest httpx` if needed):

```powershell
python -m pip install pytest httpx
python -m pytest tests -v
```

Frontend checks (from project root):

```powershell
npm run lint
npm run build
```

## Security and cleanup

- `backend/.env` and `.env.local` are ignored by Git. Never commit real keys.
- Do not commit `node_modules/`, `.venv/`, `dist/`, or `.pytest_cache/`.
- The backend applies request validation, CORS, and per-IP rate limiting.
- Project status and claims should be kept in sync with the actual source repositories.
