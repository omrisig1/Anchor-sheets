/* eslint-disable @typescript-eslint/no-unused-vars */ // /* eslint-disable @typescript-eslint/no-unused-vars */
import log from "@ajar/marker";
import UrlNotFoundException from "../exceptions/url.not.found.exception.js";
const { White, Reset, Red } = log.constants;
// Middleware to response with error response object
export const responseWithError = (err, req, res, next)=>{
    const errorResponse = {
        status: err.status || 500,
        message: err.message || "Something went wrong"
    };
    res.status(errorResponse.status).json(errorResponse);
};
// Middleware to handle UrlNotFound Exception
export const urlNotFoundHandler = (req, res, next)=>{
    next(new UrlNotFoundException(req.path));
};
export const not_found = (req, res)=>{
    log.info(`url: ${White}${req.url}${Reset}${Red} not found...`);
    res.status(404).json({
        status: `url: ${req.url} not found...`
    });
};
