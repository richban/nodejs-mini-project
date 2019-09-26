import { IBaseRequest, IBaseResponse, errorResponse } from '../expressApp'
import { IRoomRequest, IRoomResponse, IRoomBookRequest } from './roomTypes'
import { createNewRoom, createNewBooking, dailyBookings, bookingSlots } from './roomFunctions'
import { mapORMRoomToApi } from './roomMappers'
import { fetchRoomByCode, fetchAllRooms, fetchRoomById, fetchAllBookedRooms } from './roomQueries'
import * as Creators from '../factories/creators'
import moment = require('moment')

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

export async function bookRoom(req: IBaseRequest<IRoomBookRequest>, res: IBaseResponse<never, any>) {
  try {
    const user = res.locals.user!
    const room = await fetchRoomById(req.params.id)
    const bookingPros = {
      bookingStart: moment(req.body.bookingStart).toDate(),
      bookingEnd: moment(req.body.bookingEnd).toDate(),
      title: req.body.title,
      purpose: req.body.purpose,
    }
    if (!room) {
      return errorResponse(res, 'GENERIC_ROOM_NOT_FOUND', 404)
    }
    const newBooking = await createNewBooking(room, user, bookingPros)

    return res.status(200).json(newBooking)
  } catch (error) {
    return errorResponse(res, 'GENERIC_ERROR', 500, error)
  }
}

export async function getRoomsBookings(req: IBaseRequest, res: IBaseResponse<never, any>) {
  try {
    const rooms = await fetchAllBookedRooms()

    const dailyRoomBookings = rooms.map(room => {
      if (room.bookings) {
        const bookings = dailyBookings(room.bookings)
        return { ...room, bookings }
      }
      return room
    })

    const appointment = dailyRoomBookings.map(room => {
      if (room.bookings && room.bookings.length > 0) {
        const appointments = bookingSlots(room.bookings)
        return { ...room, appointments }
      }
      return room
    })

    return res.status(200).json(appointment)
  } catch (error) {
    return errorResponse(res, 'GENERIC_ERROR', 500, error)
  }
}
