import { Room } from '../entity'
import { getManager } from 'typeorm'

/**
 * Fetches a Room by it's code
 * @param code
 * @returns {Promise<Room|undefined>}
 */
export function fetchRoomByCode(code: string): Promise<Room | undefined> {
  return getManager()
    .getRepository(Room)
    .createQueryBuilder('room')
    .where('room.code = :code', { code })
    .getOne()
}

/**
 * Fetches all Rooms
 * @param code
 * @returns {Promise<undefined|Room[]>}
 */
export function fetchAllRooms(): Promise<Room[] | undefined> {
  return getManager()
    .getRepository(Room)
    .createQueryBuilder('room')
    .getMany()
}
