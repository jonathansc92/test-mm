import { CpfService } from './cpf.service';
import { CpfsController } from './cpfs.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cpf } from './cpf.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cpf])],
    controllers: [CpfsController],
    providers: [CpfService]
})
export class CpfModule {}