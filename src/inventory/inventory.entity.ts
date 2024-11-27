import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id, { eager: true })
  product: Product; // Associe l'inventaire à un produit

  @Column()
  stockLevel: number; // Niveau actuel du stock

  @Column('date')
  lastUpdated: string; // Dernière mise à jour
}
