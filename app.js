const Joi = require('joi');             // return class

const express = require('express');     // return a function
const app = express();                  // return an object

app.use(express.json());
/////srvrrrrrrrr
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
//////clos  srvrrrrrrrrrr


const students = [
    { name: 'Omar Ahmed' , code: '1600851', id: 1},
    { name: 'abdallah' , code: '160085es', id: 2},
    { name: 'youseef' , code: '1600be1', id: 3}
];


// to get all students
app.get('/api/students', (req, res) => {
    res.send(students);
});

// to get single student
// api/students/1 to get student of id 1
app.get('/api/students/:id', (req, res) => {
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }
    res.send(student);
});

// Add student
app.post('/api/students', (req, res) => {

    const { error } = validatestudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // create a new student object
    const student = {
        id: students.length + 1,
        name: req.body.name // assuming that request body there's a name property
    };
    students.push(student);
    res.send(student);
});


// Updating resources
app.put('/api/students/:id', (req, res) => {
    // Look up the student 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }

    // validate 
    // If not valid, return 400 bad request
    const { error } = validatestudent(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the student 
    // Return the updated student
    student.name = req.body.name;
    res.send(student);
});


// Deleting a student
app.delete('/api/students/:id', (req, res) => {
    // Look up the student 
    // If not existing, return 404
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) // error 404 object not found
    {
        res.status(404).send('THe student with the given id was not found.');
        return;
    }

    // Delete
    const indexs = students.indexOf(student);
    students.splice(indexs, 1);

    // Return the same student
    res.send(student);
});

// Environment variable
const port1 = process.env.PORT || 3000

app.listen(port1 /*PortNumber*/, () => console.log(`Listeneing on port ${port1}......`))

const courses = [
    { name: 'computer' , code: 'CSE431', id: 1 , description: 'sflksfsfklg' },
    { name: 'computersoft' , code: 'CSE420', id: 2 , description: 'sflksfsfklg' },
    { name: 'computerhardware' , code: 'CSE400', id: 3 , description: 'sflksfsfklg' }
];


// to get all courses
app.get('/api/courses', (req, res) => {
    res.send(courses);
});

// to get single course
// api/courses/1 to get course of id 1
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('THe course with the given id was not found.');
        return;
    }
    res.send(course);
});

// Add course
app.post('/api/courses', (req, res) => {


    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // create a new course object
    const course = {
        id: courses.length + 1,
        name: req.body.name // assuming that request body there's a name property
    };
    courses.push(course);
    res.send(course);
});


// Updating resources
app.put('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('The course with the given id was not found.');
        return;
    }

    // validate 
    // If not valid, return 400 bad request
    const { error } = validateCourse(req.body); // result.error
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Update the course 
    // Return the updated course
    course.name = req.body.name;
    res.send(course);
});


// Deleting a course
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course 
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) // error 404 object not found
    {
        res.status(404).send('The course with the given id was not found.');
        return;
    }

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the same course
    res.send(course);
});

// Environment variable
const port = process.env.PORT || 3001

app.listen(port /*PortNumber*/, () => console.log(`Listeneing on port ${port}......`))


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
    const pattern1 = /^[a-zA-Z_']{1,}$/;
    const schemaa = Joi.object ({
        s_name: Joi.string().regex(RegExp(pattern1)).required(),
        code: Joi.string().length(7).required(),
        id: Joi.number().integer().default(integer2)
    })
    return schemaa.validate(student);
}
// function validateCourse(course) {
//     const integer = (parent, helpers) => {

//         return parent.id +1;
//       };
//     integer.description = 'generated id';
//     const schema = {
//         name: Joi.string().min(5).required(),
//         code: Joi.string().regex(/^[a-zA-Z]{3}\d[0-9]{3}$/).required(),
//         id: Joi.number().integer().default(integer),
//         description: Joi.string().max(200)
//     }
//     return Joi.validate(course, schema);
// }

// function validatestudent(course) {
//     const integer2 = (parent, helpers) => {

//         return parent.id +1;
//       };
//     integer.description = 'generated id';
//     const schema = {
//         name: joi.string().regex(/^[a-zA-Z'_]$/).required(),
//         code: Joi.string().length(7).required(),
//         id: Joi.number().integer().default(integer2)
//     }
//     return Joi.validate(course, schema);
// }