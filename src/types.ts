export interface User {
  id?: number
  publicId: string
  firstName: string | any
  lastName: string | any
  username: string
  password?: string
  salt: string
  profileCompleted: boolean
  skills?: Skill[] | any
}

export interface Skill {
  id: number
  publicId: string
  skillName: string
}
