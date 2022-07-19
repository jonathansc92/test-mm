import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CpfModule } from './cpfs/cpf.module';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: `mongodb://maxmilhas:maxmilhas@test-mm-db:27017`,
      entities: ['dist/**/**.entity{.ts,.js}'],
      synchronize: true,
      useNewUrlParser: true,
      logging: true,
    }),
    CpfModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
