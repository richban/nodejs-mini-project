import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { User } from './User'
import { Room } from './Room'
import { BaseEntity } from './BaseEntity'

@Entity()
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'booking_id' })
  public id: number

  @Column({ name: 'booking_start', type: 'datetime', nullable: false })
  public bookingStart: Date

  @Column({ name: 'booking_end', type: 'datetime', nullable: false })
  public bookingEnd: Date

  @Column({ name: 'purpose', type: 'varchar' })
  public purpose: string

  @ManyToOne(type => User, user => user.bookings)
  user: User

  @ManyToOne(type => Room, room => room.bookings)
  room: Room
}
