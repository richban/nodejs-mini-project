import { IBaseRequest, IBaseResponse, errorResponse } from '../expressApp'
import { IRoomRequest, IRoomResponse } from './roomTypes'
import { createNewRoom } from './roomFunctions'
import { mapORMRoomToApi } from './roomMappers'
import { fetchRoomByCode, fetchAllRooms } from './roomQueries'
import * as Creators from '../factories/creators'

export async function createRoom(req: IBaseRequest<IRoomRequest>, res: IBaseResponse<never, IRoomResponse>) {
  try {
    const { name, description, capacity, code } = req.body
    const room = await createNewRoom({ name, description, capacity, code })
    if (!room) {
      return errorResponse(res, 'GENERIC_ERROR', 500)
    }
    res.status(200).json(mapORMRoomToApi(room))
  } catch (error) {
    return errorResponse(res, 'GENERIC_ERROR', 500)
  }
}

export async function updateRoom(req: IBaseRequest<IRoomRequest>, res: IBaseResponse<never, IRoomResponse>) {
  const input = req.body
  let room = await fetchRoomByCode(input.code)

  if (!room) {
    return errorResponse(res, 'GENERIC_ERROR', 404)
  }

  try {
    room.name = input.name
    room.description = input.description
    room.capacity = input.capacity
    room = await Creators.save(room)

    res.status(200).json(mapORMRoomToApi(room))
  } catch (error) {}
}

export async function getRooms(req: IBaseRequest, res: IBaseResponse<never, IRoomResponse[]>) {
  try {
    const rooms = await fetchAllRooms()

    if (!rooms) {
      return errorResponse(res, 'GENERIC_ERROR', 404)
    }

    const mappedRooms = rooms.map(room => mapORMRoomToApi(room))
    return res.status(200).json(mappedRooms)
  } catch (error) {
    return errorResponse(res, 'GENERIC_ERROR', 500)
  }
}
