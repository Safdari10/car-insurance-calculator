import { Router } from "express";
import { index, quote } from "../controllers/api3Controller";

const router = Router();


router.get("/", index);
router.post("/quote", quote);

export { router };

