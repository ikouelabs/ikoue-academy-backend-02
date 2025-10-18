import { type Request, type Response, Router } from "express"

const router = Router()

router.get('/', (_: Request, res: Response) => {
  res.send('Hello World!')
})    

export default router;  