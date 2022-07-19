import { IsNotEmpty, IsString } from "class-validator";

export class CreateCpfInput {
    @IsString()
    @IsNotEmpty({message: "Cpf is can not empty."})
    cpf: string
}