import { Router } from 'express';
import { startOfHour, parseISO, } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
const appointmentsRouter = Router();


const appointmentsRepository = new AppointmentsRepository();
appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;
    const CreateAppointments = new CreateAppointmentService(appointmentsRepository);
    const parsedDate = parseISO(date)
    const appointment = CreateAppointments.execute({ date: parsedDate, provider })
    return response.json(appointment);
  } catch (err : any) {
    return response.status(400).json({ error: err?.message });
  }
});

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments)
})

export default appointmentsRouter;
