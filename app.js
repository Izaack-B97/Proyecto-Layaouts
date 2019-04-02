const express = require("express");
const bodyParser = require("body-parser");
let app = express();
const mongoose = require("mongoose"); 
const Schema = mongoose.Schema;
mongoose.connect("mongodb://localhost/fotos"); 

let userSchemaJSON = {
    email: String,
    password: String
};

let user_schema = new Schema(userSchemaJSON);
let User = mongoose.model("User",user_schema);

/*        midominio.com/estatico/...    */
app.use('/estatico',express.static('public'));
app.use(express.static('assets')); 

/*Leer parametros que vienen en la peticion*/
app.use(bodyParser.json());// para peticiones application/json
app.use(bodyParser.urlencoded({extended: true}));

 
app.set('view engine','pug');

app.get('/', function(req,res){
    res.render('index');
});

app.get('/login', function(req,res){
    User.find(function(err,doc){
        console.log(doc);
        console.log("--------------------");
        res.render('login');
    });
});

app.post('/users', function(req,res){
    let user=new User({email: req.body.email, password: req.body.password});

    user.save(function(){
        res.send("Guardamos tus datos");
    });
    
    
    
});

app.listen(8080,function(){ 
    console.log('El servidor esta corriendo en el puerto 8080');
});
