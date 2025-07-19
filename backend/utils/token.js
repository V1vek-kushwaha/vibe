import jwt from 'jsonwebtoken'
const generateToken = async (user)=>{
    try {
        const token = await jwt.sign({user},process.env.JWT_SECRET,{expiresIn:"5yr"})
        return token
    } catch (error) {
        return resizeBy.status(500).json(`token generation error`,error)
    }
}

export default generateToken