import express from "express"
import Create_worker from "../controllers/Create_worker.js"

const router = express.Router();
router.post('/create_worker', Create_worker);
export default router;