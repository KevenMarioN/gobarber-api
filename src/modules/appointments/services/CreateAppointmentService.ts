import { startOfHour } from "date-fns";

import AppError from "@shared/errors/AppError";
import Appointment from "../infra/typeorm/entities/Appointment";

import IAppointmentsRepository from "../infra/repositories/AppointmentsRepository";

interface IRequest {
  date : Date;
  provider_id : string;
}


class CreateAppointmentService {

  constructor(
    private appointmentsRepository: IAppointmentsRepository
  ){

  }
  public async execute({date,provider_id} : IRequest) : Promise<Appointment> {
    
    const appointmentDate = startOfHour(date);
    
    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(appointmentDate);
  
    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }
  
    const appointment = this.appointmentsRepository.create({provider_id,date :  appointmentDate})
    await this.appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;