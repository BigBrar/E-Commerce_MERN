import jwt from 'jsonwebtoken'

// this file is basically for protected routes that are only accessible by admins, /add /remove product.
// it is called each time the /add and /remove endpoints are hit and it verifies the admin based on jwt token included in headers

const adminAuth = (req, res, next)=>{
    try{
    const {token} = req.headers
    if (!token){
        return res.json({success:false, message:"Not authorized, Login again!"})
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET)

    if (token_decode != process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
        return res.json({success:false, message:"Not authorized, Login again!"})
    }
    next()

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

export default adminAuth    