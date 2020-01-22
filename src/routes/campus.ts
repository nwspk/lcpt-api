import { Router, Request, Response } from 'express'

import asyncHandler from 'express-async-handler'
import { listHandler, responseHandler } from '../util'
import Campus from 'src/models/Campus.model'

const router = Router()
// router.use(authenticate)
// router.use(adminVerify)
export default router

router.get(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
        const params = await listHandler(Campus, req, null, { relations: ['dean'] });
        return responseHandler(res, params)
    })
)

router.get(
    '/:id',
    asyncHandler(async function (req: Request, res: Response) {
        const record = await Campus.findOne(req.params.id)
        res.send(record)
    })
)
