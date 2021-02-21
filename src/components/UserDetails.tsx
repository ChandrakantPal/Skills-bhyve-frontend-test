import axios from 'axios'
import { FormEvent, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useAuthDispatch, useAuthState } from '../context/auth'
import { Skill, User } from '../types'
import classNames from 'classnames'
import InputGroup from './InputGroup'

interface Props {
  length: number
  currentIndex: number
  click: (index: number) => void
}

const Pagination: React.FC<Props> = ({ length, click, currentIndex }) => {
  const indexes = length / 10

  const indexArray = []

  for (let i = 0; i < indexes; i++) {
    indexArray.push(i + 1)
  }

  return (
    <div className="flex flex-wrap justify-center my-6">
      {indexArray.map((index) => (
        <button
          key={index}
          className={classNames(
            'px-4 py-2 mr-2 text-center text-blue-300 border border-blue-300 rounded text-xs my-1',
            { 'bg-gray-900': index === currentIndex }
          )}
          onClick={() => click(index)}
          disabled={index === currentIndex}
        >
          {index}
        </button>
      ))}
    </div>
  )
}

export default function UserDetails() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [skills, setskills] = useState<Skill[]>([])
  const [userSkills, setUserSkills] = useState<string[]>([])
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(10)
  const [currentIndex, setCurrentIndex] = useState(1)
  const [userError, setUserError] = useState('')
  const [skillError, setSkillError] = useState('')

  const dispatch = useAuthDispatch()
  const { authenticated } = useAuthState()

  const history = useHistory()

  useEffect(() => {
    const source = axios.CancelToken.source()
    const fetchSkills = async () => {
      try {
        const { data } = await axios.get<Skill[]>('/skills', {
          cancelToken: source.token,
        })
        setskills(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchSkills()
    return () => {
      source.cancel()
    }
  }, [])

  const paginationClickHandler = (index: number) => {
    setCurrentIndex(index)
    if (index === 1) {
      setStart(0)
    } else {
      setStart((index - 1) * 10)
    }
    setEnd(index * 10)
  }

  const skillUpdateHandler = (skill: string) => {
    const userSkillArray = [...userSkills]
    if (userSkillArray.includes(skill)) {
      const skillIndex = userSkillArray.findIndex(
        (userSkill) => userSkill === skill
      )
      userSkillArray.splice(skillIndex, 1)
    } else {
      userSkillArray.push(skill)
    }
    setUserSkills(userSkillArray)
  }

  const addUserDetails = async (event: FormEvent) => {
    event.preventDefault()
    if (firstName.trim() === '' || lastName.trim() === '') {
      setUserError('Fields Must not be empty')
    } else {
      const token = localStorage.getItem('token')
      try {
        setUserError('')
        const responseObject = await axios.post(
          '/user/basic/profile',
          {
            firstName,
            lastName,
          },
          {
            headers: {
              AUTHORIZATION: `Bearer ${token}`,
            },
          }
        )
        // console.log(responseObject)
        dispatch('UPDATE_USER', responseObject.data)
        setFirstName('')
        setLastName('')
      } catch (err) {
        // console.log(err)
        setSkillError('Something went wrong')
      }
    }
  }

  const addUserSkills = async () => {
    const token = localStorage.getItem('token')
    try {
      setSkillError('')
      const responseObject = await axios.post(
        '/user/skills',
        {
          skills: userSkills,
        },
        {
          headers: {
            AUTHORIZATION: `Bearer ${token}`,
          },
        }
      )
      // console.log(responseObject)
      dispatch('UPDATE_USER', responseObject.data)
    } catch (err) {
      // console.log(err)
      setSkillError(err.response.data.message)
    }
  }

  if (!authenticated) history.push('/login')
  const skillsToDisplay = skills.slice(start, end)

  return (
    <div className="h-full bg-gray-700">
      <div className="container flex pt-12">
        <div className="w-full px-4 md:p-0">
          <h2 className="mb-1 text-xl font-bold text-blue-300 uppercase">
            User Info
          </h2>
          <div className="py-4 mb-4 text-blue-300 border border-blue-300 rounded">
            <div className="mx-2 md:mx-auto md:w-1/3">
              <form onSubmit={addUserDetails}>
                <InputGroup
                  placeholder="FIRSTNAME"
                  type="text"
                  value={firstName}
                  setValue={setFirstName}
                  className="mb-2"
                />
                <InputGroup
                  placeholder="LASTNAME"
                  type="text"
                  value={lastName}
                  setValue={setLastName}
                  className="mb-4"
                />
                <div className="my-2 text-center">
                  {userError && (
                    <small className="font-medium text-red-600">
                      {userError}
                    </small>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-400 border border-gray-300 rounded"
                >
                  Update User Details
                </button>
              </form>
            </div>
          </div>
          <h2 className="mb-1 text-xl font-bold text-blue-300 uppercase">
            Skills
          </h2>
          <div className="py-4 text-blue-300 border border-blue-300 rounded">
            {skills.length > 0 && (
              <>
                {skillsToDisplay.map((skill) => (
                  <p
                    key={skill.id}
                    className={classNames(
                      'md:w-1/3 px-4 py-2 mx-2 md:mx-auto mb-2 border border-blue-300 rounded cursor-pointer text-xs',
                      { 'bg-gray-900': userSkills.includes(skill.skillName) }
                    )}
                    onClick={() => skillUpdateHandler(skill.skillName)}
                  >
                    {skill.skillName}
                  </p>
                ))}
                <Pagination
                  length={skills.length}
                  click={paginationClickHandler}
                  currentIndex={currentIndex}
                />
                <div className="my-2 text-center">
                  {skillError && (
                    <small className="font-medium text-red-600">
                      {skillError}
                    </small>
                  )}
                </div>
                <div className="flex justify-evenly">
                  <button
                    className="w-32 py-2 mr-6 text-xs font-bold text-white uppercase bg-blue-400 border border-gray-300 rounded"
                    disabled={userSkills.length === 0}
                    onClick={addUserSkills}
                  >
                    Add User Skills
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="flex justify-end my-4">
            <Link to="/">
              <p className="w-20 py-1 text-xs text-center text-blue-200 capitalize border border-blue-200 rounded md:w-32">
                Home
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
