import { CreateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @CreateDateColumn() public entity_created: Date
}
