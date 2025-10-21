# Vite + React + Go Base Template

A high-performance fullstack template with Vite + React for the frontend and Go with Chi router for the backend. Ideal for real-time applications and microservices.

## Features

- **Vite + React** - Modern frontend with instant HMR
- **Go + Chi Router** - High-performance compiled backend
- **TypeScript** - Full type safety on frontend
- **Tailwind CSS** - Utility-first styling
- **Air Hot Reload** - Automatic Go code reloading
- **CORS Middleware** - Pre-configured for cross-origin requests
- **WebSocket Support** - Built-in WebSocket handling

## What's Included

### Frontend (`/frontend`)
- Vite + React 18 setup
- TypeScript configuration
- Tailwind CSS integration
- API client examples
- Responsive UI components

### Backend (`/backend`)
- Go application with Chi router
- CORS middleware configured
- Example REST endpoints
- Health check endpoint
- Air configuration for hot reload

## Development

Both servers start automatically when you create a project from this base in Tesslate Studio:

- **Frontend**: Accessible via the preview URL
- **Backend API**: `http://localhost:8080`

Air watches for Go file changes and automatically rebuilds and restarts the server.

## Project Structure

```
/frontend
  /src
    App.tsx              # Main application
    main.tsx            # Entry point
    index.css           # Global styles
  vite.config.ts        # Vite configuration
  package.json          # Frontend dependencies

/backend
  main.go               # Go application
  go.mod                # Go module definition
  .air.toml             # Air hot reload config
```

## API Endpoints

- `GET /` - Welcome message
- `GET /health` - Health check
- `GET /api/items` - List all items
- `POST /api/items` - Create new item

## Frontend API Usage

The frontend is configured to proxy `/api/*` requests to the backend:

```typescript
// Calls http://localhost:8080/api/items
const response = await fetch('/api/items');
const data = await response.json();
```

## Adding New Endpoints

### Backend

```go
// backend/main.go
r.Get("/api/users", func(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(map[string]interface{}{
        "users": []string{},
    })
})
```

### Frontend

```typescript
// frontend/src/api/users.ts
export async function getUsers() {
  const response = await fetch('/api/users');
  return response.json();
}
```

## WebSocket Support

The Chi router supports WebSocket connections. Example handler:

```go
import "github.com/gorilla/websocket"

var upgrader = websocket.Upgrader{
    CheckOrigin: func(r *http.Request) bool {
        return true
    },
}

func handleWebSocket(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        return
    }
    defer conn.Close()

    // Handle messages
    for {
        messageType, message, err := conn.ReadMessage()
        if err != nil {
            break
        }
        conn.WriteMessage(messageType, message)
    }
}
```

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Go Documentation](https://go.dev/doc/)
- [Chi Router](https://github.com/go-chi/chi)
- [Air - Live Reload](https://github.com/cosmtrek/air)

## Tesslate Studio

This base is optimized for use with Tesslate Studio. The `TESSLATE.md` file contains configuration for automatic dual-server startup with Air hot reload.
