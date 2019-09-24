import * as Entity from '../entity'

export type EntityOrPromise<T> = T | Promise<T>

type EntityProps<T> = { [p in keyof T]?: T[p] }

export type UserProps = EntityProps<Entity.User>
export type RoomProps = EntityProps<Entity.Room>
export type BookingProps = EntityProps<Entity.Booking>

export type OrmEntity = Entity.User | Entity.Room | Entity.Booking
