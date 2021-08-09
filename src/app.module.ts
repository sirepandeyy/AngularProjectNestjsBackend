
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactService } from './contacts/contact.service';
import { ContactsController } from './contacts/contacts.controller';
import { Contact } from './entities/contact.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'ngNest',
      username: 'postgres',
      password: 'qwerty',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Contact]),
  ],
  controllers: [AppController, ContactsController],
  providers: [AppService, ContactService],
})
export class AppModule { }
