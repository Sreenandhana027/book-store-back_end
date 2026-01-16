const  appmiddleware=(re,res,next)=>{
    console.log("Inside App Middleware");
    next()
    
}
module.exports=appmiddleware