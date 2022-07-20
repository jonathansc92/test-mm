import { CpfService } from "./cpf.service";
import { Controller, Get, Param, Body, Post, Delete } from "@nestjs/common";
import { Cpf } from './cpf.entity';
import { CreateCpfInput } from "./dto/create-cpf-input";

@Controller('cpf')
export class CpfsController {

    constructor(
        private service: CpfService
    ) { }

    @Get()
    async getAll(): Promise<Cpf[]> {
        return await this.service.getAll();
    }

    @Get(':cpf')
    async checkCpf(@Param('cpf') cpf: string): Promise<Cpf> {
        return await this.service.checkCpf(cpf);
    }

    @Post()
    async create(@Body() cpf: CreateCpfInput): Promise<Cpf> {
        return await this.service.create(cpf);
    }

    @Delete(':cpf')
    async delete(@Param('cpf') cpf: string) {
        return await this.service.delete(cpf);
    }
}