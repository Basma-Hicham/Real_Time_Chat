import jwt from "jsonwebtoken"
import dotenv from "dotenv"
// generate token
// send it to user in a HTTP cookie
// u can adjust expiration time of cookie so user must log in again
dotenv.config()
export const generateToken = (userId,res) =>{

    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn:"7d"
    })
    
    res.cookie("jwt", token , {
        maxAge: 7 * 24 * 60 * 60 * 1000 , //7d in milliseconds
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
     // RES.COOKIE () => express function to set a cookie on the response object(res)
     // jwt => the name of cookie 
     // token => value stored in cookie
    /* optionalObject for more securtiy {
    maxAge: lifetime of cookie in millisec
    httpOnly : {
    means => ONLY <<BROWSER AND SERVER>> can use and see this cookie ,, JAVASCRIPT IN FRONTEND cann't see it
    prevents => XSS attacks , cross-stie scripting attacks
    }
    sameSite : 
    strict => neans the cookie will only be sent in requests from the SAMESITE
    prevents => CSRF (cross-site request forgery attacks)
    secure : true => means it sends the cookie ONLY OVER HTTPS if true 
    <<process.env.NODE_ENV !== "development">> in PRODUCTIONS nad the opposite in DEVELOPMENT
    
    }*/ 

    return token
}