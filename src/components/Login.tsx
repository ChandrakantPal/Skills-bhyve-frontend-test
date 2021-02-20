import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from '../context/auth'
import InputGroup from './InputGroup'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const dispatch = useAuthDispatch()
  const { authenticated } = useAuthState()

  const history = useHistory()

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()
    try {
      setErrors([])
      setErrorMessage('')
      const responseObject = await axios.post('/user/signin', {
        username,
        password,
      })
      localStorage.setItem('token', responseObject.data.accessToken)
      dispatch('LOGIN', responseObject.data.user)
      if (!responseObject.data.user.profileCompleted) {
        history.push('/userdetails')
      } else {
        history.push('/')
      }
    } catch (err) {
      // console.log(err)
      if (Array.isArray(err.response.data.message)) {
        setErrors(err.response.data.message)
      } else {
        setErrorMessage(err.response.data.message)
      }
    }
  }

  if (authenticated) history.push('/')

  return (
    <div className="flex text-blue-200">
      <div
        className="w-20 h-screen bg-center bg-cover md:w-48"
        style={{
          backgroundImage: `url('https://cdn.dribbble.com/users/3281732/screenshots/14636958/media/79a0f9b5ed90fc2634c9b85a6b52b234.jpg?compress=1&resize=800x600')`,
        }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Login</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form onSubmit={submitForm}>
            <InputGroup
              className="mb-2"
              value={username}
              placeholder="EMAIL"
              type="text"
              setValue={setUsername}
            />
            <InputGroup
              className="mb-4"
              value={password}
              placeholder="PASSWORD"
              type="password"
              setValue={setPassword}
            />
            <div className="mb-2 text-center md:w-80">
              {errorMessage && (
                <small className="font-medium text-red-600">
                  {errorMessage}
                </small>
              )}
              {errors.length > 0 &&
                errors.map((error, i) => (
                  <small className="block font-medium text-red-600" key={i}>
                    {error}
                  </small>
                ))}
            </div>
            <button
              type="submit"
              className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-400 border border-gray-300 rounded"
            >
              Login
            </button>
          </form>
          <small>
            New to Readitor?
            <Link to="/signup">
              <span className="ml-1 text-white uppercase">Sign Up</span>
            </Link>
          </small>
        </div>
      </div>
    </div>
  )
}
