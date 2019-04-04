const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user").User;
const app = express();

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
    let user=new User({
        "email": req.body.email, 
        "password": req.body.password,
        "password_confirmation": req.body.password_confirmation
    });

    console.log(user.password_confirmation);
    

    

    user.save(function(){
        res.send("Guardamos tus datos");
    });
    
    
    
});

app.listen(8080,function(){ 
    console.log('El servidor esta corriendo en el puerto 8080');
});
