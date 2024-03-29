import { CustomApiError } from "../errors/CustomApiError.js";

const errorHandler = (err, req, res, next) => {

    if(err instanceof CustomApiError){
        return res.status(err.status).json({message: err.message});
    }

    return res.status(500).json({message: "Something went wrong!"});

}

export { errorHandler }