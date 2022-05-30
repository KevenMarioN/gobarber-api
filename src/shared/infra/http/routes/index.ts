import { Router } from 'express';


import sessionsRouter from './sessions.route';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import usersRouter from '@modules/users/http/routes/users.route';

const routes = Router();

routes.use('/ ',appointmentsRouter);
routes.use('/users',usersRouter);
routes.use('/sessions',sessionsRouter);

export default routes;