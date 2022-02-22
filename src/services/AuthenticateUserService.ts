import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';
import User from "../models/User";

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
      throw new Error('Incorrect email/password combination.');
    }
    const passswordMatched = await compare(password, user.password);

    if (!passswordMatched) {
      throw new Error('Incorrect email/password combination.');
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