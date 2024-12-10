import { Router } from 'express';

import userRouter from './user.routes';
import albumRouter from './album.routes';

const router: Router = Router();

router.use('/user', userRouter);
router.use('/albums', albumRouter);

export default router;
