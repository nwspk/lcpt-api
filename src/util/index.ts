import { Router, Request, Response } from 'express'
import { In, Entity, BaseEntity, Like, Raw, } from 'typeorm'

interface LameModel {
  findAndCount: (params: any, extra?: any) => Promise<[any[], number]>
}

export async function listHandler<T extends LameModel>(
  model: T,
  req: Request,
  whereExtender?: (filter: any, currentWhere: any) => Promise<any>,
  extraQueryOpts?: any,
) {
  const [from, to] = req.query.range ? JSON.parse(req.query.range) : [0, 100]
  const filter: any = req.query.filter ? JSON.parse(req.query.filter) : {}
  let where = {} as any
  if (filter.id) {
    where.id = In(filter.id)
  }
  if (filter.user) {
    where = [{
      name: Raw(alias => `LOWER(${alias}) Like '%${filter.user.toLowerCase()}%'`),
    }, {
      email: Raw(alias => `LOWER(${alias}) Like '%${filter.user.toLowerCase()}%'`),
    }];
  }

  const finalWhere = whereExtender ? await whereExtender(filter, where) : where

  const [resp, total] = await model.findAndCount(
    {
      where: finalWhere,
      skip: from,
      take: to - from + 1,
      order: {
        createdAt: 'ASC',
      },
      ...extraQueryOpts
    },
  )

  return { resp, total, to, from }
}

export function responseHandler(
  res: Response,
  {
    resp,
    total,
    to,
    from,
  }: {
    resp: any
    total: number
    to: number
    from: number
  }
) {
  return res
    .set('Content-Range', `Content-Range: posts ${from}-${Math.min(to, total)}/${total}`)
    .set({ 'Access-Control-Expose-Headers': 'Content-Range' })
    .send(resp)
}
