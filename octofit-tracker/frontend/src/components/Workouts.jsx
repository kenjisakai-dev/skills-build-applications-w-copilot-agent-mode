import { useState, useEffect } from 'react'
import { API_BASE_URL } from '../api'

const DIFFICULTY_BADGE = {
  beginner: 'success',
  intermediate: 'warning',
  advanced: 'danger',
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/workouts/`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        setWorkouts(Array.isArray(data) ? data : (data.results ?? []))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status" /></div>
  if (error) return <div className="alert alert-danger">Erro ao carregar treinos: {error}</div>

  return (
    <div>
      <h2 className="mb-4">Workouts</h2>
      <div className="row g-3">
        {workouts.map(workout => (
          <div key={workout._id} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{workout.name}</h5>
                <span className={`badge bg-${DIFFICULTY_BADGE[workout.difficulty] ?? 'secondary'}`}>
                  {workout.difficulty}
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{workout.description}</p>
                <p className="text-muted mb-2">
                  <strong>Duration:</strong> {workout.duration} min
                </p>
                {workout.exercises.length > 0 && (
                  <>
                    <h6>Exercises</h6>
                    <ul className="list-group list-group-flush">
                      {workout.exercises.map((ex, i) => (
                        <li key={i} className="list-group-item px-0">
                          {ex.name} — {ex.sets}×{ex.reps}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
