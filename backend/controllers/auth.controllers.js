import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/token.js"
import sendMail from "../utils/SendMail.js"

export const signUp = async (req, res) => {
    // console.log("req",req.body);


    try {
        const { name, email, password, username } = req.body

        const userdata = await User.findOne({ email })

        if (userdata) {
            return res.status(400).json({ message: "Email already exist !" })
        }
        const UserName = await User.findOne({ username })

        if (UserName) {
            return res.status(400).json({ message: "UserName already exist !" })
        }
        if (password.lenght < 6) {
            return res.status(400).json({ message: "Password must be 6 charcters !" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            name,
            username,
            email,
            password: hashedPassword
        })

        const token = await generateToken(user)

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
            secure: false,
            sameSite: "Strict"

        })
        return res.status(200).json({ user })



    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: `signup error`, error })
    }

}



export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password!" });
        }

        const token = await generateToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
            secure: false,
            sameSite: "Strict"
        });

        return res.status(200).json({ user, token });
    } catch (error) {
        return res.status(500).json({ message: "signin error", error });
    }
}

export const signOut = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "sighout success" })
    } catch (error) {
        return res.status(500).json({ message: "signOut error", error });
    }
}


export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not Found" })
        }
        const otp = Math.floor(1000 + Math.random() * 9000).toString()
        user.resetOtp = otp
        user.otpExipres = Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false
        await user.save()
        const subject = 'Reset password'
        await sendMail(email, subject, otp)
        return res.status(200).json({ message: "otp send seccessfully" })
    } catch (error) {
        console.log("error here", error)
        return res.status(500).json({ message: "send otp error", error });
    }
}


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const user = await User.findOne({ email })
        if (!user || user.resetOtp != otp || user.otpExipres < Date.now()) {
            return res.status(400).json({ message: "invalid or expired otp" })
        }
        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExipres = undefined
        await user.save()
        return res.status(200).json({ message: "otp verified " })


    } catch (error) {
        return res.status(500).json({ message: "verify otp error", error });
    }
}
export const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "otp verification required" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        user.password = hashedPassword
        user.isOtpVerified = false
        await user.save()
        return res.status(200).json({ message: "password reset successfully" })


    } catch (error) {
        return res.status(500).json({ message: "verify otp error", error });
    }
}



