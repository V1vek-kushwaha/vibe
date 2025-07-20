import express from 'express'
import { resetPassword, sendOtp, signIn, signOut, signUp, verifyOtp } from '../controllers/auth.controllers.js'

const router = express.Router()

router.post("/signup", signUp)
router.post("/signin", signIn)
router.post("/signout", signOut)
router.post("/forgot-password/send-otp", sendOtp)
router.post("/forgot-password/verify-otp", verifyOtp)
router.post("/forgot-password/reset-password", resetPassword)


export default router