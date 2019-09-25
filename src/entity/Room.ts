import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { Booking } from './Booking'

@Entity()
export class Room extends BaseEntity {
  // tslint:disable-next-line:variable-name
  @PrimaryGeneratedColumn()
  public room_id: number

  @Column({ type: 'varchar', unique: true })
  public code: string

  @Column({ type: 'varchar', nullable: false, length: 17 })
  public name: string

  @Column({ type: 'varchar', nullable: true, length: 50 })
  public description: string | null

  @Column({ type: 'int' })
  public capacity: number

  @OneToMany(type => Booking, booking => booking.room)
  public bookings: Booking[] | undefined
}
