import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { User } from './user/user.entity'; // Exemple d'entité User
import { Product } from './product/product.entity'; // Exemple d'entité User
import { OrderModule } from './order/order.module';
import { Order } from './order/order.entity'; // Exemple d'entité User
import { InventoryModule } from './inventory/inventory.module';
import { Inventory } from './inventory/inventory.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'danielle', // Utilisateur créé
      password: '0000', // Mot de passe de l'utilisateur
      database: 'gest_commande', // Nom de la base de données
      entities: [User, Product, Order, Inventory], // Ajoutez vos entités ici
      synchronize: true, // Optionnel : synchronisation automatique (à utiliser avec précaution)
    }),
    AuthModule,
    ProductModule,
    OrderModule,
    InventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
