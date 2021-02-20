import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuthState } from '../context/auth'
import { User } from '../types'

export default function Home() {
  const [user, setUser] = useState<User>()

  const { authenticated } = useAuthState()

  const history = useHistory()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get<User>('/user/profile')
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchUserData()
  }, [])

  if (!authenticated) history.push('/login')
  return (
    <>
      <div className="container flex h-screen pt-16">
        <div className="w-auto px-4 mx-auto mt-16 mb-auto md:p-0">
          <div className="py-4 text-blue-300 border border-blue-300 rounded">
            <div className="flex justify-center">
              <div className="w-24 h-24 border border-blue-300 rounded-full">
                <h1 className="my-5 text-5xl text-center">🧑‍🚀</h1>
              </div>
            </div>
            <div className="my-2 border-b border-blue-300"></div>
            <div className="px-4">
              <h1 className="text-2xl text-blue-500">
                username : <em className="text-blue-300"> {user?.username}</em>
              </h1>
              <h1 className="text-2xl text-blue-500">
                first name :{' '}
                <em className="text-blue-300"> {user?.firstName}</em>
              </h1>
              <h1 className="text-2xl text-blue-500">
                last name : <em className="text-blue-300"> {user?.lastName}</em>
              </h1>
              <h1 className="text-2xl text-blue-500">
                Skills :{' '}
                {user?.skills &&
                  user?.skills.map((skill: string, i: number) => (
                    <em key={i} className="mr-4 text-blue-300">
                      {skill}
                    </em>
                  ))}
              </h1>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Link to="/userdetails">
              <p className="w-20 py-1 text-center text-blue-200 capitalize border border-blue-200 rounded md:w-32">
                Update Profile
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
