import { Cpf } from "./../../src/cpfs/cpf.entity";
import * as uuid from 'uuid';
import * as cpfValidator from 'node-cpf';

export default class TestUtil {
    static  giveAMeAValidCpf(): Cpf {
        const cpf = new Cpf();
        cpf._id = uuid.v4();
        cpf.cpf = cpfValidator.generate();
        return cpf;
    }  
}