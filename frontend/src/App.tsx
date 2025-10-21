import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>('')
  const [items, setItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/health')
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
      const response = await fetch('/api/items')
      const data = await response.json()
      setItems(data.items)
    } catch (error) {
      console.error('Failed to fetch items:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Vite + React + Go
          </h1>
          <p className="text-xl text-gray-600">
            Built with Tesslate Studio
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Backend Connection</h2>
            {loading ? (
              <p className="text-gray-500">Connecting to backend...</p>
            ) : (
              <p className="text-green-600 font-medium">{message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="text-lg font-semibold mb-2">Vite Frontend</h3>
            <p className="text-gray-600 text-sm">
              Lightning-fast HMR and instant server start
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-3">🔷</div>
            <h3 className="text-lg font-semibold mb-2">Go Backend</h3>
            <p className="text-gray-600 text-sm">
              High-performance compiled Go API with Chi router
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-3xl mb-3">🔄</div>
            <h3 className="text-lg font-semibold mb-2">Hot Reload</h3>
            <p className="text-gray-600 text-sm">
              Both frontend and backend reload automatically
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">API Testing</h2>
          <button
            onClick={fetchItems}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Fetch Items from API
          </button>

          {items.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Items:</h3>
              <pre className="bg-gray-50 p-4 rounded-lg overflow-auto">
                {JSON.stringify(items, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Backend API running on Go with Chi router
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
