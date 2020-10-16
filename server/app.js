const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.json');

const Routes = require('./routes');
const {contactRouter} = Routes;

(async () => {
    try{
        const port = (config.port)? config.port : 3000;
        const app = express();

        app.use(bodyParser.json({
            type: '*/*'
        }));

        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Authorization, Content-Type, Accept");
            res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
            next();
        });

        app.use('/contacts', contactRouter);


        //generic err handler
        app.use(function(err, req, res, next){
            if(err){
                const status = (err.status)? err.status : 500;
                return res.status(status).json({
                    status: 0,
                    message: err,
                });
            }
            next();
        });
        
        //404 route not found
        app.use(function(req,res){
            return res.status(404).json({
                status: 0,
                message: "no such route exists",
            });
        });

        app.listen(port, function() {
            console.log("server started on port", port);
        });


    }
    catch(err){
        console.log('mainFuncton::err: ',err);
    }
})();