


const errorMiddleware = (err, req, res, next) => {
    err.message ||= 'Internal Server Error'
    err.statusCode ||= 500

    if(err.code === 11000){
        const error = Object.keys(err.keyPattern).join(",")
        err.message ||= `Duplicate Field ${error} Entered`
        err.statusCode = 400
    }

    if(err.name === "CastError"){
        err.message = `Resource not found. Invalid: ${err.path}`
        err.statusCode = 404
    }   

    return res.status(err.statusCode).json
    ({
    success: false, 
    message: process.env.NODE_ENV.trim() === "DEVELOPMENT" ? err :  err.message
    })
}

const TryCatch = (passedFunction) => async (req, res, next) => {
try {
    await passedFunction(req, res, next)
} catch (error) {
    next(error)
}
}

export{
    errorMiddleware,
    TryCatch
}