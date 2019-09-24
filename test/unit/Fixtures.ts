import * as Create from '../../src/factories/creators'
import * as Entity from '../../src/entity'
import { UserRole } from './../../src/entity/User'

export async function createUser(role: UserRole = 'standard', email?: string, password?: string): Promise<Entity.User> {
  const user = await Create.newUser({
    email: email || `${role as string}_${Date.now()}@edugoai.com`,
    password: password || `${role as string}`,
  })
  user.setPermissions(role)
  await Create.save(user)

  return user
}
