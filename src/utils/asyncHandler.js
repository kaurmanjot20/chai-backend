const asyncHandler = (requestHandler) =>{
    return (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=> next(err))
    }
}


export {asyncHandler}

/*
const asyncHandler = () => {}
const asyncHandler = (func) => {}
const asyncHandler = (func) => {()=>{}}
finally we get 
const asyncHandler = (fn) => async () => {
    try{
        await fn(req,res,next)
    }catch(error){
        resizeBy.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}
*/