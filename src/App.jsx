import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import HomePage from './components/HomePage/HomePage'
import Main from './components/Main/Main'
import { AuthProvider } from './context/AuthContext';
import TaskDetail from './components/TaskDetail/TaskDetail'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/main" element={<Main />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
