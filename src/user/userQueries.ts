import { Connection, getManager } from 'typeorm'
import { User } from '../entity'
import { dbo } from '../orm'

export async function fetchUsers(): Promise<User[] | undefined> {
  const conn: Connection = await dbo()
  return conn
    .getRepository(User)
    .createQueryBuilder('user')
    .getMany()
}

// Returns the user with the given id
export function getUserById(userId: string | number): Promise<User | undefined> {
  return getManager()
    .getRepository(User)
    .createQueryBuilder('usr')
    .where('usr.user_id = :userId', { userId })
    .getOne()
}
