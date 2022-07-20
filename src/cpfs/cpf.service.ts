import { 
    BadRequestException,
    NotFoundException,
    ConflictException,
    Injectable,
    Logger
} from '@nestjs/common';
import * as cpfValidator from 'node-cpf';
import { InjectRepository } from '@nestjs/typeorm';
import { Cpf } from './cpf.entity';
import { Repository } from 'typeorm';
import { CreateCpfInput } from './dto/create-cpf-input';

@Injectable()
export class CpfService {
  logger: Logger;

    constructor(
        @InjectRepository(Cpf) 
        private repository: Repository<Cpf>,
    ) {
        this.logger = new Logger(CpfService.name);
    }

    async getAll(): Promise<Cpf[]> {
        const cpfs = await this.repository.find();
        return cpfs;
    }

    async checkCpf(cpf: string): Promise<Cpf> {
        const cpfIsValid = await this.cpfIsValid(cpf);

        if (cpfIsValid) {
            const cpfUnMask = cpfValidator.unMask(cpf);

            const cpfData = await this.repository.findOne({ where: { cpf: cpfUnMask } });

            if (!cpfData) {
                this.logger.warn(`The CPF ${cpfIsValid}  is not found.`);
                throw new NotFoundException("CPF inst found.", "NotFoundCpfException");
            }

            return cpfData;
        }
    }

    async create(input: CreateCpfInput): Promise<Cpf> {
        const cpfIsValid = await this.cpfIsValid(input.cpf);

        if (cpfIsValid) {

            const cpfUnMask = cpfValidator.unMask(input.cpf);
        
            const cpfExist = await this.repository.findOne({ where: { cpf: cpfUnMask } });

            if (cpfExist) {
                this.logger.warn(`The CPF ${cpfIsValid}  is already exist.`);
                throw new ConflictException("CPF is already exist.", "ExistsCpfException");
            }
            input.cpf = cpfUnMask;
            
            return await this.repository.save(input);
        }
    }

    async delete(cpf: string) {
        const cpfFind = await this.checkCpf(cpf);

        const cpfUnMask = cpfValidator.unMask(cpf);

        if (cpfFind) {
            return await this.repository.delete({ cpf: cpfUnMask });
        }
    }

    async cpfIsValid(cpf: string) {
        const cpfValidate = cpfValidator.validate(cpf);

        if (cpfValidate === false) {
            this.logger.warn(`The CPF ${cpf} is not valid`);
            throw new BadRequestException("CPF is not valid.", "InvalidCpfException");
        }

        return true;
    }

}