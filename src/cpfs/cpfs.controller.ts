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
        return this.service.getAll();
    }

    @Get(':cpf')
    async checkCpf(@Param('cpf') cpf: string): Promise<Cpf> {
        return this.service.checkCpf(cpf);
    }

    @Post()
    async create(@Body() cpf: CreateCpfInput): Promise<Cpf> {
        return this.service.create(cpf);
    }

    @Delete(':cpf')
    async delete(@Param('cpf') cpf: string) {
        return this.service.delete(cpf);
    }
}