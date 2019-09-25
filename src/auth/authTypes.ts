import { UserRole, User } from './../entity/User'

export interface ILoginRequest {
  username: string
  password?: string
}

export interface ILoginLocals {
  user: User
  token: string
  role: UserRole
}

export interface ILoginResponse {
  token: string
  user?: User
  role?: UserRole
}
