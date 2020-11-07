// Serviço para a Criação de um Agendamento

import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        // Verifica se já possui um agendamento existente no horário escolhido
        const findAppointmnetInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        if (findAppointmnetInSameDate) {
            throw new AppError('This Appointment is already booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
