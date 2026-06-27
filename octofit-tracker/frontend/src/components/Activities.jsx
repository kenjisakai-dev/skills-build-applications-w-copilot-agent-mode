import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../api'

export default function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/activities/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        setActivities(Array.isArray(data) ? data : (data.results ?? []))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status" /></div>
  if (error) return <div className="alert alert-danger">Erro ao carregar atividades: {error}</div>

  return (
    <div>
      <h2 className="mb-4">Activities</h2>
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th>User</th>
            <th>Type</th>
            <th>Duration (min)</th>
            <th>Calories Burned</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {activities.map(activity => (
            <tr key={activity._id}>
              <td>{activity.user?.username ?? activity.user}</td>
              <td>{activity.activity_type}</td>
              <td>{activity.duration}</td>
              <td>{activity.calories_burned}</td>
              <td>{new Date(activity.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
