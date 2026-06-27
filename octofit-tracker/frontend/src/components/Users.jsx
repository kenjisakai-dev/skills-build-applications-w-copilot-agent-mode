import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../api'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/users/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        setUsers(Array.isArray(data) ? data : (data.results ?? []))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status" /></div>
  if (error) return <div className="alert alert-danger">Erro ao carregar usuários: {error}</div>

  return (
    <div>
      <h2 className="mb-4">Users</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Age</th>
            <th>Member Since</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>{new Date(user.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
