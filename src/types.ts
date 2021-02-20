export interface User {
  id?: number
  publicId: string
  firstName: string | any
  lastName: string | any
  username: string
  password?: string
  salt: string
  profileCompleted: boolean
  skills?: string[] | any
}

export interface Skill {
  id: number
  publicId: string
  skillName: string
}
