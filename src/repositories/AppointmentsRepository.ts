// Repositório personalizado dos Agendamentos, possui funções que não são padrões ao repositório do TypeORM

import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async findByDate(date: Date): Promise<Appointment | null> {
        const findAppointmnet = await this.findOne({
            where: { date },
        });

        return findAppointmnet || null;
    }
}

export default AppointmentsRepository;
