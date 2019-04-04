const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost/fotos",{useNewUrlParser: true});//Conexion con mongodb 

//Colleciones -> tablas
//Documentos -> filas
let posibles_valores = ["M","F"]; 
let email_match = [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Coloca un email valido"];

let user_schema = new Schema({
    "name": String,
    "lastname": String,
    "username": {type: String,required: true, maxlength:[50,"Username muy grande"]},
    "password": 
    {   type: String, 
        minlength:[8,"El password es muy pequeño"],
        validate:{
            validator:function(p){
               return this.password_confirmation == p;
            },
            message: "Las contraseñas no coinciden"
        }
    },
    "age": {type:Number, min:[5,"La edad no puede ser menor que 5"],max:[100,"La edad no puede ser mayor que 100"]},
    "email": {type:String, required: "El correo es obligatorio", match:email_match},
    "date_of_bird": Date,
    "sex":{type: String, enum:posibles_valores, message:"Opcion no valida"}
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