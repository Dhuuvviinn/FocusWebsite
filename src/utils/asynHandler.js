const asynHandler = (requestHandler) =>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,nexy)).catch((err)=>next(err))
    }
}

export {asynHandler}