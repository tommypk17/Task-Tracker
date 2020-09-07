module.exports = function requestValidation(options){

    if(options.content = 'www-encoded'){
        return function (req, res, next){
            //make a middleware to check headers before any submits, using inline here
            const contentType = req.header('Content-Type');
            if(contentType !== 'application/x-www-form-urlencoded') {
                res.json({success: false, message:`Incorrect header: ${contentType}`});
                return;
            }
            next();
        }
    }
}