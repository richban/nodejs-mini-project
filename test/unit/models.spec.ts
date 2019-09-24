import * as chai from 'chai'
import { createUser } from './Fixtures'
import { dbo } from '../../src/orm'
import { fetchUsers } from '../../src/user/userQueries'

const expect = chai.expect

describe('userQueries', async () => {
  before(async () => {
    await dbo({ forceDropSchema: true })
    await createUser('admin')
    await createUser('standard')
  })

  it('should have more than 1 users', async () => {
    const users = await fetchUsers()
    expect(users).to.have.length(2)
  })
})
