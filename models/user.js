const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos",{useNewUrlParser: true});//Conexion con mongodb 

//Colleciones -> tablas
//Documentos -> filas

let user_schema = new Schema({
    "name": String,
    "lastname": String,
    "username": String,
    "password": String,
    "age": Number,
    "email": String,
    "date_of_bird": Date
}); 

user_schema.virtual("password_confirmation")
    .get(function() {
        return this.p_c ;
    })
    .set(function(password){
        return p_c = password;
    }); 

let User = mongoose.model("User",user_schema);     

module.exports.User = User;

/*
String
Number
Buffer
Boolean
Mixed
Objectid
Array
*/ 