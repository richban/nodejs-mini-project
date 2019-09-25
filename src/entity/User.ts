import { Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, getManager } from 'typeorm'
import { Booking } from './Booking'

export type UserRole = 'admin' | 'standard'

export type PermissionsScheme = string

export enum Feature {
  None = 1,
  Booking,
}

export enum Permission {
  None = 1,
  Read = 10,
  Update = 20,
  Create = 30,
  Delete = 40,
  Cancel = 50,
}

@Entity()
export class User {
  // tslint:disable-next-line:variable-name
  @PrimaryGeneratedColumn()
  public user_id: number

  @Column({ type: 'varchar', unique: true })
  public email: string

  @Column({ type: 'varchar', length: 60, nullable: false, default: '' })
  public password: string

  @Column({ type: 'simple-json', nullable: true })
  public permissions: PermissionsScheme[] | null

  @OneToMany(type => Booking, booking => booking.user)
  public bookings: Booking[] | undefined

  @BeforeInsert()
  public async checkEmailUnused() {
    const mngr = getManager()
    const nrExists = await mngr.getRepository(User).count({ email: this.email })
    if (nrExists > 0) {
      throw Error(`Unable to create User with email "${this.email}": email already exists`)
    }
  }

  public static makeScheme(feature: Feature, permission: Permission): PermissionsScheme {
    // ["Booking:Delete","Booking:Update"]
    return `${Feature[feature]}:${Permission[permission]}`
  }

  public hasPermission(feature: Feature, permission: Permission) {
    const scheme: string = User.makeScheme(feature, permission)
    return this.permissions && this.permissions.indexOf(scheme) > -1
  }

  public setPermissions(role: UserRole): string[] {
    this.permissions = []
    switch (role) {
      case 'admin':
        this.permissions.push(User.makeScheme(Feature.Booking, Permission.Create))
        this.permissions.push(User.makeScheme(Feature.Booking, Permission.Read))
        this.permissions.push(User.makeScheme(Feature.Booking, Permission.Update))
        break
      case 'standard':
        this.permissions.push(User.makeScheme(Feature.Booking, Permission.Read))
        this.permissions.push(User.makeScheme(Feature.Booking, Permission.Cancel))
        break
    }
    return this.permissions
  }

  public getRole(): UserRole {
    let role: UserRole = 'standard'

    if (this.hasPermission(Feature.Booking, Permission.Create)) {
      role = 'admin'
    }

    return role
  }
}
