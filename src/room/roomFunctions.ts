import * as Creators from '../factories/creators'
import * as Entity from './../entity/'
import moment = require('moment')

/**
 * Creates and saves a new meeting Room
 * @param data Rooms.props
 */

export async function createNewRoom(data: {
  name: string
  code: string
  description: string
  capacity: number
}): Promise<Entity.Room | undefined> {
  const room = await Creators.newRoom(data)
  await Creators.save(room)

  return room
}

/**
 * Creates and saves a new Booking
 * @param {Room}
 * @param {User}
 * @param {BookingProps}
 * @return {Booking}
 */

export async function createNewBooking(
  room: Entity.Room,
  user: Entity.User,
  props: any,
): Promise<Entity.Booking | undefined> {
  const newBooking = await Creators.newBooking(room, user, props)
  await Creators.save(newBooking)

  return newBooking
}

export const dailyBookings = (bookings: Entity.Booking[]) => {
  return bookings.filter(
    (booking: Entity.Booking) => moment(booking.bookingStart).format('YYYY-MM-DD') === moment().format('YYYY-MM-DD'),
  )
}

// formats the time extracted from the time inputs into an array, eg 8:30 => [8, 30]
export const formatTime = (time: string) => {
  let formatedTimeArray = []
  formatedTimeArray = time.split('.').map(item => parseInt(item, 10))
  return formatedTimeArray
}

export const bookingSlots = (bookings: Entity.Booking[]) => {
  // An array from 1 to 48 representing each half-hour of the day
  const timeSlot = [...Array(48).keys()]

  bookings.forEach((booking: Entity.Booking) => {
    const startTime = moment(booking.bookingStart).format('H.mm')
    const endTime = moment(booking.bookingEnd).format('H.mm')
    const startTimeArray = formatTime(startTime)
    const endTimeArray = formatTime(endTime)

    for (let i = startTimeArray[0] * 2 + +!!startTimeArray[1]; i < endTimeArray[0] * 2 + +!!endTimeArray[1]; i++) {
      const bookingData: any = Object.assign({}, { ...booking })
      timeSlot[i] = typeof timeSlot[i] == 'number' ? bookingData : [timeSlot[i], bookingData]
    }
  })

  return timeSlot
}
