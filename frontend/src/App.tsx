import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  // Get the base path from the HTML base tag or environment
  const getBasePath = () => {
    const base = document.querySelector('base')?.getAttribute('href') || import.meta.env.BASE_URL || '/'
    return base.endsWith('/') ? base.slice(0, -1) : base
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const basePath = getBasePath()
        const response = await fetch(`${basePath}/api/health`)
        const data = await response.json()
        setMessage(data.message)
        setLoading(false)
      } catch (error) {
        console.error('Failed to fetch from API:', error)
        setMessage('Failed to connect to backend')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const fetchItems = async () => {
    try {
      const basePath = getBasePath()
      const response = await fetch(`${basePath}/api/items`)
      const data = await response.json()
      setItems(data.items || [])
    } catch (error) {
      console.error('Failed to fetch items:', error)
      setItems([])
    }
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Vite + React + Go
          </h1>
          <p className="text-gray-600">
            Fullstack template with separate frontend and backend
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Backend Status</h2>
          {loading ? (
            <p className="text-gray-500">Connecting to backend...</p>
          ) : (
            <p className="text-green-600 font-medium">{message}</p>
          )}
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Test API</h2>
          <button
            onClick={fetchItems}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Fetch Items from Backend
          </button>

          {items.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Response:</p>
              <pre className="bg-white p-3 rounded border border-gray-200 text-sm overflow-auto">
                {JSON.stringify(items, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>
            Frontend: Vite + React (Port 5173) | Backend: Go + Air (Port 8080)
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
