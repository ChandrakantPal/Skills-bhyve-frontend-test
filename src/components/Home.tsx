import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthState } from '../context/auth'
import { User } from '../types'

export default function Home() {
  const [user, setUser] = useState<User>()

  const { authenticated } = useAuthState()

  const history = useHistory()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const token = localStorage.getItem('token')
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
      <div className="container flex pt-4">
        <div className="w-full px-4 mx-auto md:p-0"></div>
      </div>
    </>
  )
}
