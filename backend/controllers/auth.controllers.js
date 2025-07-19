import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateToken from "../utils/token.js"

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

        return res.status(200).json({ user });
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
