import { Router, Request } from 'express'
import user from './user';
import campus from './campus';

const router = Router()

router.use('/user', user);
router.use('/campus', campus);

export default router
