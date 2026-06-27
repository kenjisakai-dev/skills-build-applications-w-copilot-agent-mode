import { useState, useEffect } from 'react'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

export default function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then(data => {
        setTeams(Array.isArray(data) ? data : (data.results ?? []))
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-5"><div className="spinner-border" role="status" /></div>
  if (error) return <div className="alert alert-danger">Erro ao carregar times: {error}</div>

  return (
    <div>
      <h2 className="mb-4">Teams</h2>
      <div className="row g-3">
        {teams.map(team => (
          <div key={team._id} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-header bg-dark text-white">
                <h5 className="mb-0">{team.name}</h5>
              </div>
              <div className="card-body">
                <h6 className="card-subtitle mb-2 text-muted">
                  Members ({team.members.length})
                </h6>
                <ul className="list-unstyled mb-0">
                  {team.members.map(member => (
                    <li key={member._id ?? member}>
                      {member.username ?? member}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
