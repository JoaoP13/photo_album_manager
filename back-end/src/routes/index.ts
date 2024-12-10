import { Router } from 'express';

import userRouter from './user.routes';
import albumRouter from './album.routes';
import photoRouter from './photo.routes';

const router: Router = Router();

router.use('/user', userRouter);
router.use('/albums', albumRouter);
router.use('/photo', photoRouter);

export default router;
