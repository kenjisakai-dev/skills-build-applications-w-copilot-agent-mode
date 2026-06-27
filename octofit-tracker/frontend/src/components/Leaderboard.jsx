import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../api'

export default function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/leaderboard/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        setEntries(Array.isArray(data) ? data : (data.results ?? []))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status" /></div>
  if (error) return <div className="alert alert-danger">Erro ao carregar leaderboard: {error}</div>

  return (
    <div>
      <h2 className="mb-4">Leaderboard</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Score</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, idx) => (
            <tr key={entry._id}>
              <td>{idx + 1}</td>
              <td>{entry.user?.username ?? entry.user}</td>
              <td>{entry.score}</td>
              <td>{new Date(entry.updated_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
