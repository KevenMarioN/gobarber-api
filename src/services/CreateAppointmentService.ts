import { startOfHour } from "date-fns";
import {getCustomRepository } from 'typeorm';
import { v4 } from "uuid";

import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface Request {
  date : Date;
  provider : string;
}


class CreateAppointmentService {
  public async execute({date,provider} : Request) : Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    
    const appointmentDate = startOfHour(date);
    
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);
  
    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }
  
    const appointment = appointmentsRepository.create({provider,date :  appointmentDate,id : v4()})
    console.log(appointment)
    // await appointmentsRepository.save(appointment);
    return appointment;
  }
}

export default CreateAppointmentService;