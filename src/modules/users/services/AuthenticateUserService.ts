import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import User from '../infra/typeorm/entities/User';



interface Request {
  email: string;
  password: string;
}
interface Response {
  user: User
  token : string;
}
class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = await getRepository(User);

    const user = await usersRepository.findOne({
      where: { email }
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination.',401);
    }
    const passswordMatched = await compare(password, user.password);

    if (!passswordMatched) {
      throw new AppError('Incorrect email/password combination.',401);
    }
    const {expiresIn,secret} = authConfig.jwt;
    const token = sign({},secret,{
      subject : user.id,
      expiresIn,
    });
    return { user,token };
  }
}

export default AuthenticateUserService;