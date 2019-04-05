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

app.get('/signup', function(req,res){
    User.find(function(err,doc){
        console.log(doc);
        console.log("--------------------");
        res.render('signup');
    });
});

app.get('/login', function(req,res){
        res.render('login');
});

app.post('/users', function(req,res){
    let modelUser = {
        "email": req.body.email, 
        "username": req.body.username,
        "password": req.body.password,
        "password_confirmation": req.body.password_confirmation
    }
   
    let user=new User(modelUser);

    console.log(user.password);
    
    // user.save(function(err,user,numero){
    //     if (err)
    //        console.log(String(err));
 
    //     res.send("Guardamos tus datos");
    // });
    
    /* PROMISES */
    user.save()
        .then(function(){
            res.send("Guardamos tu informacion correctamente");
        })
        .catch(function(err){
            res.send("No logramos guardar tu informacion, el error es: \n" + err);
        });
    
    
});

app.post('/sessions', function(req,res){
    /*query,fills(campos),callback */
    User.findOne   ({ "email":req.body.email,"password":req.body.password },"",function(err,docs){
         console.log(docs);
         res.send("Bienvenido " + req.body.email + " !!!");    
         
    });
});

app.listen(8080,function(){ 
    console.log('El servidor esta corriendo en el puerto 8080');
});
