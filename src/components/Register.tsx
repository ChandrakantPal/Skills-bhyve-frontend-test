import axios from 'axios'
import { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuthState } from '../context/auth'
import InputGroup from './InputGroup'

export default function SignUp() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const { authenticated } = useAuthState()

  const history = useHistory()

  const submitForm = async (event: FormEvent) => {
    event.preventDefault()
    try {
      setErrors([])
      setErrorMessage('')
      await axios.post('/user/signup', {
        username,
        password,
      })
      history.push('/login')
    } catch (err) {
      // console.log(err)
      if (Array.isArray(err.response.data.message)) {
        setErrors(err.response.data.message)
      } else {
        setErrorMessage(err.response.data.message)
      }
    }
  }

  console.log({ errors, errorMessage })

  if (authenticated) history.push('/')

  return (
    <div className="flex text-blue-200">
      <div
        className="w-20 h-screen bg-center bg-cover md:w-48"
        style={{
          backgroundImage: `url('https://cdn.dribbble.com/users/3281732/screenshots/14636958/media/79a0f9b5ed90fc2634c9b85a6b52b234.jpg?compress=1&resize=800x600')`,
        }}
      ></div>
      <div className="flex flex-col justify-center p-4 md:pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Sign Up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form onSubmit={submitForm}>
            <InputGroup
              className="mb-2"
              value={username}
              placeholder="USERNAME"
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
              Sign Up
            </button>
          </form>
          <small>
            Already have a account?
            <Link to="/login">
              <span className="ml-1 text-white uppercase">Login</span>
            </Link>
          </small>
        </div>
      </div>
    </div>
  )
}
