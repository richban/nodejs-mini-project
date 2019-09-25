import { IRoomResponse } from './roomTypes'
import * as Entity from './../entity/'

export function mapORMRoomToApi(room: Entity.Room): IRoomResponse {
  return {
    name: room.name,
    description: room.description ? room.description : undefined,
    capacity: room.capacity,
  }
}
