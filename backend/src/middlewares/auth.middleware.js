import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req,res,next) => {
/*l2en el protectRoute hnstkhdmha ka interception before 
accessing route so we need NEXT to access after intercepting
*/

try{
//1)search for exisiting token
//2)if there's ,, decode cause token has userId
//3)if decoded == null so it's invalid
//4)if valid search in database by the id 
//5)if user not found error 404 ,, if found send
// user data (PASSWORD EXTRACTED) to req.user then hit next function 

const token = req.cookies.jwt
if(!token){
    return res.status(401).json({message: "Unauthorized - No token provided"})
}

const decoded = jwt.verify(token, process.env.JWT_SECRET)

if (!decoded)
    return res.status(401).json({message: "Unauthorized - Invalid token"})

const user = await User.findById(decoded.userId).select("-password")
if(!user)
    return res.status(404).json({message: "User Not found"})
req.user = user
next()


}catch(err){
return res.status(500).json({message: "internal zeft error"})
}

}