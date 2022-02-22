import { getRepository } from 'typeorm';
import User from "../models/User";
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
      throw new Error('Email address already used.');
    }
    const user = await usersRepository.create({
      name, email, password
    });
    await usersRepository.save(user);
    return user;
  }
}

export default CreateUserService;