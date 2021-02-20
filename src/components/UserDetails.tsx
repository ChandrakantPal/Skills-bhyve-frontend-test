import axios from 'axios'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuthState } from '../context/auth'
import { Skill, User } from '../types'

export default function UserDetails() {
  const [skills, setskills] = useState<Skill[]>([])
  const [pageinationIndex, setPageinationIndex] = useState(0)

  const { authenticated, user } = useAuthState()

  const history = useHistory()

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await axios.get<Skill[]>('/skills')
        setskills(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchSkills()
  }, [])

  if (!authenticated) history.push('/login')
  if (!!user.profileCompleted) history.push('/')
  return (
    <>
      <div className="container flex pt-16">
        <div className="w-full px-4 md:p-0">
          <div className="mt-10 text-blue-300 border border-blue-300 rounded">
            {skills.length > 0 &&
              skills
                .slice(pageinationIndex, 10)
                .map((skill) => <p key={skill.id}>{skill.skillName}</p>)}
          </div>
        </div>
      </div>
    </>
  )
}
