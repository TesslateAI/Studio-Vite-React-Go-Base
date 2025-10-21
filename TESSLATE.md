# Vite + React + Go Base

High-performance fullstack template with Vite + React for the frontend and Go with Chi router for the backend. Ideal for real-time applications and microservices.

## Framework Configuration

**Frontend**: Vite + React
**Backend**: Go + Chi Router
**Port**: 5173

## Development Server

**Start Command**:
```bash
# Start backend first (in background)
cd backend && go mod download && air &

# Start frontend
cd frontend && npm install && npm run dev -- --host 0.0.0.0 --port 5173
```

**Stop Command**:
```bash
pkill -f "air"
pkill -f "vite"
```

## Environment Variables

The following environment variables are automatically provided by Tesslate Studio:

```env
VITE_BASE_PATH=/preview/user1-project5  # Auto-generated path prefix for routing
NODE_ENV=development                     # Development mode
PORT=5173                                # Frontend server port
VITE_HMR_PROTOCOL=ws                     # HMR WebSocket protocol (ws/wss)
VITE_HMR_PORT=80                         # HMR WebSocket port (80/443)
CHOKIDAR_USEPOLLING=true                 # File watching in Docker
CHOKIDAR_INTERVAL=1000                   # Polling interval
```

You can also define custom variables:

```env
VITE_API_URL=http://localhost:8080
GO_ENV=development
PORT=8080
```

**Note**: `VITE_BASE_PATH` is automatically set by Tesslate and used by `vite.config.ts` for the `base` configuration. This allows your Vite app to work correctly when deployed under a path prefix.

## Project Structure

```
/frontend               # Vite + React Frontend
  /src
    /components        # React Components
    /pages            # Page Components
    App.tsx           # Main App Component
    main.tsx          # Entry Point
  vite.config.ts      # Vite Configuration
  package.json        # Frontend Dependencies

/backend                # Go Backend
  main.go             # Go Application Entry
  go.mod              # Go Module Definition
  /handlers           # HTTP Handlers
  /middleware         # Middleware Functions
  /models             # Data Models
  .air.toml           # Air Hot Reload Config
```

## Features

- **Vite Frontend**: Lightning-fast HMR and build times
- **Go Backend**: High-performance compiled backend
- **Air Hot Reload**: Automatic Go code reloading during development
- **Chi Router**: Lightweight, fast HTTP router
- **CORS Middleware**: Pre-configured for cross-origin requests
- **WebSocket Support**: Built-in WebSocket handling
- **REST API**: Example CRUD endpoints

## Tech Stack

- Vite
- React 18
- TypeScript
- Go 1.21+
- Chi Router
- Air (Hot reload)

## Getting Started

1. The development servers will start automatically
2. Frontend accessible at preview URL
3. Backend API at `http://localhost:8080`
4. Air watches Go files and reloads on changes

## Example API Usage

Frontend code to call backend:

```typescript
// src/api/client.ts
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

export async function getItems() {
  const response = await fetch(`${API_URL}/api/items`);
  return response.json();
}
```

Backend API endpoint:

```go
// backend/handlers/items.go
func GetItems(w http.ResponseWriter, r *http.Request) {
    json.NewEncoder(w).Encode(map[string]interface{}{
        "items": []string{},
    })
}
```

## WebSocket Example

Backend WebSocket handler:

```go
// backend/handlers/websocket.go
func HandleWebSocket(w http.ResponseWriter, r *http.Request) {
    conn, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        return
    }
    defer conn.Close()

    // Handle WebSocket messages
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
