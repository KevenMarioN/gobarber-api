import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm'

import AppointmentsRepository from '../../modules/appointments/repositories/AppointmentsRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import CreateAppointmentService from '../../modules/appointments/services/CreateAppointmentService';
const appointmentsRouter = Router();


appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post('/', async (request, response) => {
  
    const { provider_id, date } = request.body;
    const parsedDate = parseISO(date);

    const createAppointments = new CreateAppointmentService();

    const appointment = await createAppointments.execute({ date: parsedDate, provider_id });
    
    return response.json(appointment);
});

appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments)
})

export default appointmentsRouter;