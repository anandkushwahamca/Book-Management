import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { DatabaseModule } from './database/database.module';
import * as redisStore from 'cache-manager-redis-store';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      store: redisStore,
      isGlobal: true,
      host: 'localhost',
      port: 6379,
      ttl: 120,
    }),
    EventEmitterModule.forRoot(),
    ScheduleModule.forRoot(),
    DatabaseModule,
    UsersModule,
    BookModule,
    AuthorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
