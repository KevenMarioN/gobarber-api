import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
const appointmentsRouter = Router();



appointmentsRouter.post('/', async (request, response) => {
  try {
    const { provider, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointments = new CreateAppointmentService();

    const appointment = await createAppointments.execute({ date: parsedDate, provider });
    
    return response.json(appointment);
  } catch (err: any) {
    return response.status(400).json({ error: err?.message });
  }
});

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments)
})

export default appointmentsRouter;
