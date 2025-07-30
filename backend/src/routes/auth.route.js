import express from "express"
import { login, logout, signup,updateData, checkAuth } from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"
//routing is a feature by EXPRESS


const router = express.Router()

router.post('/signup', signup)

router.post('/login',login)

router.post('/logout',logout )

//updating field in a row 
router.patch('/update-data', protectRoute , updateData)

//if refreshed the page check if authenticated
router.get('/check',protectRoute,checkAuth)

export default router //default used mainly for importing a single thing from the exported file