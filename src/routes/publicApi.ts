import { Router, Request, Response } from 'express'
import expressAsyncHandler = require('express-async-handler');
import Campus from 'src/models/Campus.model';

const router = Router()

router.get(
    '/college.json',
    expressAsyncHandler(async (req: Request, res: Response) => {
        const [
            campuses
        ] = await Promise.all([
            Campus.find({ relations: ['dean'] })
        ]);

        res.send({
            campuses,
        });
    })
);

export default router
