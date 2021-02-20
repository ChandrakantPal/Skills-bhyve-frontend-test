import axios from 'axios'
import { Route, Switch } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import SignUp from './components/Register'
import UserDetails from './components/UserDetails'

axios.defaults.baseURL = 'https://be.bhyve-app.com:3020'

const token = localStorage.getItem('token')

if (token) {
  axios.defaults.headers.AUTHORIZATION = `Bearer ${token}`
}

const App: React.FC = () => {
  return (
    <div className="w-screen h-screen bg-gray-700">
      <Navbar />
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/userdetails" exact component={UserDetails} />
        <Route path="/" exact component={Home} />
      </Switch>
    </div>
  )
}

export default App
