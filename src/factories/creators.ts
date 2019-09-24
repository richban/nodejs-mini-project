import * as Types from './factoryTypes'
import { dbo } from '../orm'
import * as Entity from '../entity/'
import { getManager } from 'typeorm'
import { EntityManager } from 'typeorm/entity-manager/EntityManager'

/**
 * Creates and returns a new User entity
 * @param {UserProps} props
 * @return {User}
 */
export async function newUser(props: Types.UserProps): Promise<Entity.User> {
  return (await dbo()).getRepository(Entity.User).create(props)
}

/**
 * Creates and returs a new Room entity
 * @param {RoomProps} props
 * @return {Room}
 */
export async function newRoom(props: Types.RoomProps): Promise<Entity.Room> {
  return (await dbo()).getRepository(Entity.Room).create(props)
}

/**
 * Creates and returns a new Booking entity
 * @param {Room}
 * @param {User}
 * @param {BookingProps}
 * @return {Booking}
 */
export async function newBooking(
  room: Types.EntityOrPromise<Entity.Room>,
  user: Types.EntityOrPromise<Entity.User>,
  props: Types.BookingProps,
): Promise<Entity.Booking> {
  const roomToBook = await room
  const userToBook = await user
  return (await dbo()).getRepository(Entity.Booking).create(Object.assign({ roomToBook, userToBook }, props))
}

/**
 * Persists the given entity (and all related entities?) to the database
 * @param entity the entity to save
 * @param manager an optional manager to use
 */
export function save<T extends Types.OrmEntity>(ent: T, manager?: EntityManager): Promise<T> {
  if (!manager) {
    manager = getManager()
  }

  return manager.save(ent)
}
