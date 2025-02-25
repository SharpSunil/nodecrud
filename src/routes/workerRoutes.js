import express from "express"
import { createworker, viewworker, getworker, updateworker, deleteworker } from "../controllers/Worker.js";


const router = express.Router();
router.post("/createworker", createworker);
router.get("/viewworker", viewworker);
router.get("/getworker/:id", getworker)
router.put("/updateworker/:id", updateworker)
router.delete("/deleteworker/:id", deleteworker)



export default router;