// Arquivo de configuração da Tabela de Usuários no Banco de Dados

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
    // Chave Primária
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    name: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    password: string;

    @Column('varchar')
    avatar: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
