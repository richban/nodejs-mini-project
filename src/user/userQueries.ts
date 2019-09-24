import { Connection } from 'typeorm'
import { User } from '../entity'
import { dbo } from '../orm'

export async function fetchUsers(): Promise<User[] | undefined> {
  const conn: Connection = await dbo()
  return conn
    .getRepository(User)
    .createQueryBuilder('user')
    .getMany()
}
