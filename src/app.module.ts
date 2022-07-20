import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CpfModule } from './cpfs/cpf.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
    }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
      useUnifiedTopology: true
    }),
    CpfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
