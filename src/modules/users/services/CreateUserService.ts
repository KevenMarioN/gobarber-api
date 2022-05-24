import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from "@shared/errors/AppError";
import User from '../infra/typeorm/entities/User';

interface Request {
  name: string;
  email: string;
  password: string
}

class CreateUserService {
  public async execute({ email, name, password }: Request): Promise<User> {
    const usersRepository = await getRepository(User);

    const checkUserExiste = await usersRepository.findOne({
      where: { email }
    });
    if (checkUserExiste) {
      throw new AppError('Email address already used.');
    }
    const hashedPassword = await hash(password,8)
    const user = await usersRepository.create({
      name, email, password : hashedPassword
    });
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;