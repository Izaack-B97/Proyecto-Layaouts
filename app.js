const express = require("express");

let app = express();
/*        midominio.com/estatico/...    */
app.use('/estatico',express.static('public'));
app.use(express.static('assets'));

app.set('view engine','pug');

app.get('/', function(req,res){
    res.render('index');
});

app.get('/login', function(req,res){
    res.render('login');
});


app.listen(8080,function(){
    console.log('El servidor esta corriendo en el puerto 8080');
});