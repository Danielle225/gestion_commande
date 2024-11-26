import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from '../user/user.entity'; // Import de l'entité User

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Ajoutez cette ligne
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
