// Arquivo de configuração da Tabela de Agendamentos no Banco de Dados
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
    // Chave Primária
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    provider_id: string;

    // Relacionamento com outra tabela
    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column('time with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;
