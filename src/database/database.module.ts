import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresTypeOrmConfigService } from './postgres-typeorm-config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresTypeOrmConfigService,
    }),
  ],
})
export class DatabaseModule {}
