import { Link, Routes, Route, useLocation } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function Home() {
  return (
    <div className="text-center py-5">
      <h1 className="display-4">Welcome to OctoFit Tracker</h1>
      <p className="lead">Track your fitness activities, compete with your team, and stay motivated!</p>
    </div>
  )
}

function NavBar() {
  const location = useLocation()
  const links = [
    { to: '/', label: 'Home' },
    { to: '/users', label: 'Users' },
    { to: '/activities', label: 'Activities' },
    { to: '/teams', label: 'Teams' },
    { to: '/leaderboard', label: 'Leaderboard' },
    { to: '/workouts', label: 'Workouts' },
  ]
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
        <div className="navbar-nav">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              className={`nav-link${location.pathname === to ? ' active' : ''}`}
              to={to}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <>
      <NavBar />
      <main className="container py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </>
  )
}

export default App
