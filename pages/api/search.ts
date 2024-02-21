import { Router, Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'

export const imageRouter = Router()

function imageSearch(req: Request, res: Response, next: NextFunction): void {
    const api_url: string = 'https://openapi.naver.com/v1/search/local.xml?query=' + encodeURI('맛집')
    axios
        .get(api_url, {
            headers: {
                'X-Naver-Client-Id': 'HkmoZuvadMifi4PVKacA',
                'X-Naver-Client-Secret': '3ABiVxxIe8',
            },
        })
        .then((data: AxiosResponse) => {
            res.send(data.data.items)
        })
        .catch((err) => next(err))
}

imageRouter.get('/', imageSearch)
