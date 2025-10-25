# TESSLATE.md - Project Context

> Context for AI agents working on this project.

## Framework Configuration

**Frontend**: Vite + React
**Backend**: Go + Chi Router
**Port**: 5173 (Frontend), 8080 (Backend)

**Tech Stack:**
- React 18 with Vite
- Tailwind CSS
- TypeScript
- Go 1.21+
- Chi Router
- Air (Hot reload)

## File Structure

```
frontend/
├── src/
│   ├── App.tsx          # Main app
│   ├── main.tsx         # Entry point
│   ├── components/      # Reusable components
│   └── pages/           # Page components
└── vite.config.ts       # Vite config

backend/
├── main.go              # Go app entry
├── go.mod               # Go module
├── .air.toml            # Hot reload config
├── handlers/            # HTTP handlers
├── middleware/          # Middleware functions
└── models/              # Data models
```

## Development Server

**Start Command**:
```bash
# Backend
cd backend && go mod tidy && go mod download && air &

# Frontend
cd frontend && npm install && npm run dev -- --host 0.0.0.0 --port 5173
```

**Production Build**:
```bash
cd frontend && npm run build
cd backend && go build -o app
```
