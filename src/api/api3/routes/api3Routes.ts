import { Router } from "express"
import { index } from "../controllers/api3Controller"

const router = Router()

router.get("/", index)


export {router}