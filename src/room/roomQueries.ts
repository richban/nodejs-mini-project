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
 *  Fetches a Room by it's id
 * @param id
 * @returns {Promise<Room|undefined>}
 */
export function fetchRoomById(id: string): Promise<Room | undefined> {
  return getManager()
    .getRepository(Room)
    .createQueryBuilder('room')
    .where('room.room_id = :id', { id })
    .getOne()
}

/**
 * Fetches all Rooms
 * @returns {Promise<undefined|Room[]>}
 */
export function fetchAllRooms(): Promise<Room[] | undefined> {
  return getManager()
    .getRepository(Room)
    .createQueryBuilder('room')
    .getMany()
}

/**
 * Fetches all Rooms with Relations
 * @param code
 * @returns {Promise<Room[]|>}
 */
export function fetchAllBookedRooms(): Promise<Room[]> {
  return getManager()
    .getRepository(Room)
    .find({
      relations: ['bookings'],
    })
}
