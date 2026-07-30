

const handleSequelizeError = (error, res) => {
    if(error.name === "SequelizeUniqueConstraintError"){
        console.log(error);
        return res.status(409).json({
            success: false,
            errors: error.errors.map(err => ({
                    message: err.message
            }))
        });
    }

    if(error.name === "SequelizeValidationError"){
        return res.status(400).json({
            success: false,
            message: "Student Validation Failed",
            errors: error.errors.map(err => {
                return {
                    field: err.path,
                    message: err.message
                }
            })
        })
    }

    console.error(error);
    return res.status(500).json({
        success: false,
        message: "An unexpected error occured"
    })
}



export default handleSequelizeError;