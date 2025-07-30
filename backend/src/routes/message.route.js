import express, { Router } from "express"
import { protectRoute } from "../middlewares/auth.middleware.js"
import { getUsersForSidebar , getMessages, sendMessage} from "../controllers/message.controller.js"

const router = express.Router()

//to see all users by auth only
router.get("/users", protectRoute,getUsersForSidebar )
router.get("/:id", protectRoute, getMessages) //getting chat between me and other by his ID
router.post("/send/:id", protectRoute,sendMessage)

export default router