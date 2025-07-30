import { generateToken } from "../lib/JWT.js"
import User from  "../models/user.model.js"
import bcrypt from "bcryptjs"

//exporting the functions only from this file == export const functionName = impementation
export const signup = async (req,res)=>{

     const { name, email, password, phone, age, wantHint, address }  = req.body

    //sigunp user
    //hash the password
    // generate token to let them know they're authenticated and send it in cookies
try {
    if(!email || !name || ! password || !phone || !age || ! address){
        return res.status(400).json({message: "All fields are required"})
    }

    if (password.length <8){
        return res.status(400).json({message : "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"})
    }
    const user = await User.findOne({email})
    if(user)  return res.status(400).json({message : "Email already exists"})
    
            //hash by bcrypt
    const salt = await bcrypt.genSalt(10) //the type of hashed password with length 
    const hashedPassword = await bcrypt.hash(password,salt) 


 

    const newUser = new User ({ //just initialize new model
        email,
        name,
        password: hashedPassword,
        phone,
        age,
        address,
        wantHint
    })

    if(newUser){
       await newUser.save() // saving the model
        generateToken(newUser._id, res) 
       return res.status(201).json({
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        userName: newUser.username,
        phone: newUser.phone,
        age: newUser.age,
        address: newUser.address,
        wantHint: newUser.wantHint,
        role: newUser.role
       })
    }
    else{
      return  res.status(400).json({message : "Invalid user data"})
    }

    


} catch (error) {
   return  res.status(500).json({message : "Internal server error"})

}}
export const login = async(req,res)=>{
    try{
    const {email, password} = req.body
    const emailCheck = await User.findOne({email})
    if(!emailCheck){
    return res.status(400).json({message : "EIther email or password is incorrect"})
    }
    
    const passCheck= await bcrypt.compare(password, emailCheck.password)
    if(passCheck){
     //generate token => by passing _id to the function
     generateToken(emailCheck._id,res)

    return res.status(200).json({message : "Logged In successfully"})
    }else
    return res.status(400).json({message : "Eiiither email or password is incorrect"})
    }catch(err){
    console.log(err.message)
    return res.status(500).json({message : "Internal server error"})

    }
}
export const logout = (req,res)=>{
// logging out == deleting cookies
try{
res.cookie("jwt","",{maxAge:0})
return res.status(200).json({message : "Logged out successfully"})
}catch(err){
        console.log(err.message)
    return res.status(500).json({message : "Internal server error"})

}

}
export const updateData = async (req,res) => {
    //check if password changed .. if happened hash before saving
    const id = req.user.id
    const {password } = req.body
    
    try{
    if (password && password.length >=6){
        const salt = await bcrypt.genSalt(10)
        const updatedHashed = await bcrypt.hash(password, salt)
        req.body.password= updatedHashed
    }    
    if(password<6){
        return res.status(400).json({message: "Password should be at least 6 characters"})
    }
    const  updates = req.body
    
    const updatedUser = await User.findByIdAndUpdate(id , updates, {
        runValidators: true,
        new: true //return the updated Doc && ENURSE updateAt is refreshed 
    })
    res.status(200).json({message: "User Updated successfuly", 
        user: updatedUser})
    }catch(err){
    console.log(err.message)
      res.status(500).json({ message: "Internal server error" });



    }
}
export const checkAuth = (req,res) =>{
    try{
    res.status(200).json(req.user)
    }catch(err){
        console.log(err.message)
        res.status(500).json({message:"Internal server error"})
    }
}