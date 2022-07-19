import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Cpf {
    @ObjectIdColumn()
    _id: string;

    @Column()
    cpf: string;

    @CreateDateColumn()
    createdAt: Date;
}