import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
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

    const token = sign({},'szBGHI9KoikpHNAvQIRTgggYmyXp8nsF80KNqZQMDsQYfTE2y8XFjywPUPUeS75X0YSghbuVksrBFsHxI7XGqw==',{
      subject : user.id,
      expiresIn : '1d',

    });
    return { user,token };
  }
}

export default AuthenticateUserService;