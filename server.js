var express = require('express');
var app = express();
const Joi = require('joi');
  
/////////////////srvrrr  
var bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser =bodyParser.urlencoded({extended:false})
app.use(express.static('public'));


app.get('/students.html',function(req,res){
res.sendFile(__dirname +"/"+"students.html");
})

app.post('/web/students/create',urlencodedParser,function(req,res){

    const { error } = validatestudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // Prepare output in JSON format
    response ={
    s_name:req.body.s_name,
    code:req.body.code,
    id:req.body.id
    };
    console.log(response);
    res.end(JSON.stringify(response));
    })
    const port3 = process.env.PORT || 8081

    app.listen(port3, () => console.log(`Listeneing on port ${port3}......`) );
    
app.get('/courses.html',function(req,res){
res.sendFile(__dirname +"/"+"courses.html");
})

app.post('/web/courses/create',urlencodedParser,function(req,res){


    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    // Prepare output in JSON format
    response ={

    c_name:req.body.c_name,
    code:req.body.code,
    id:req.body.id,
    description:req.body.description
    };
    console.log(response);
    res.end(JSON.stringify(response));
    })
    const port4 = process.env.PORT || 8080

    app.listen(port4, () => console.log(`Listeneing on port ${port4}......`) );

function validateCourse(course) {
    const integer = (parent, helpers) => {

        return parent.id +1;
        };
    integer.description = 'generated id';
    const pattern = /^[a-zA-Z]{3}[0-9]{3}$/;
    const schema = Joi.object  ({
        c_name: Joi.string().min(5).required(),
        code: Joi.string().regex(RegExp(pattern)).required(),
        id: Joi.number().integer().default(integer),
        description: Joi.string().max(200)
    })
    return schema.validate(course);
}

function validatestudent(student) {
    const integer2 = (parent, helpers) => {

        return parent.id +1;
        };
    integer2.description = 'generated id';
    const pattern1 = /^[a-zA-Z'_]$/;
    const schemaa = Joi.object ({
        s_name: Joi.string().regex(RegExp(pattern1)).required(),
        code: Joi.string().length(7).required(),
        id: Joi.number().integer().default(integer2)
    })
    return schemaa.validate(student);
}


  // const schema = {
    //     name: Joi.string().min(5).required(),
    //     code: Joi.string().regex(/^[a-zA-Z]{3}\d[0-9]{3}$/).required(),
    //     id: Joi.number().integer().default(4),
    //     description: Joi.string().max(200)
    // }

    // const results = schema.validate(req.body);
    // if (results.error) {
    //     res.status(400).send(result.error.details[0].message);
    //     return;
    // }
    // var server1 =app.listen(8080,function(){
    // var host1 =server1.address().address
    // var port1 =server1.address().port
    // console.log("Example app listening at http://%s:%s",host1,port1)})