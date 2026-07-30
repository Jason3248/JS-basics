export const errorHandler = (error, req, res, next) => {
    try {
        console.log(error.cause?.code)
        if(res.headerSent) return next(error);
        if(error.cause?.code === '23505'){
            return res.status(409).json({
                success: false,
                message: "Unique value expected"
            })
        }
        if(errorcause?.code === '22P02'){
            return res.status(400).json({
                success: false,
                message: "Invalid value for database column"
            })
        }
        if(error.cause?.code === '23502'){
            return res.status(400).json({
                success: false,
                message: "Not null value expected"
            })
        }

        const statusCode = error.statusCode ?? 500;
        return res.status(statusCode).json({
            success: false,
            message: statusCode === 500 ? "Internal server error" : error.message
        })
    } catch (error) {
        
    }
}