import { getManager } from 'typeorm'
import { User } from '../entity'

/**
 * Fetches all the Users
 * @returns {Promise<User[]|Undefined>}
 */
export async function fetchUsers(): Promise<User[] | undefined> {
  return getManager()
    .getRepository(User)
    .createQueryBuilder('user')
    .getMany()
}

/**
 * Fetches a User by user_id
 * @param userId
 * @returns {Promise<User|Undefined>}
 */
export function getUserById(userId: string | number): Promise<User | undefined> {
  return getManager()
    .getRepository(User)
    .createQueryBuilder('usr')
    .where('usr.user_id = :userId', { userId })
    .getOne()
}

/**
 * Fetches a  User by email address
 * @param userEmail
 * @returns {Promise<undefined|User>}
 */
export function fetchUserByEmail(userEmail: string): Promise<User | undefined> {
  return getManager()
    .getRepository(User)
    .createQueryBuilder('user')
    .where('user.email = :email', { email: userEmail })
    .getOne()
}
