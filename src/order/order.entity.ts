import { User } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @Column('date')
  orderDate: string;

  @Column('decimal')
  totalAmount: number;

  @Column()
  status: string; // Ex : 'pending', 'shipped'
}
