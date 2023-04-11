import { Router } from "express";
import { getAllUsers } from "./handlers";
import { createOneUser } from "./handlers";
const router = Router();
router.get(`/`, getAllUsers);
router.post(`/`, createOneUser); 
export default router;