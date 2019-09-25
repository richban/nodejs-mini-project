import * as Creators from '../factories/creators'
import * as Entity from './../entity/'

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
