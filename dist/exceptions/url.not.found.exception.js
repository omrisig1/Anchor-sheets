import HttpException from "./http.exception.js";
export default class UrlNotFoundException extends HttpException {
    constructor(path){
        super(404, `Url with path ${path} not found`);
    }
}
