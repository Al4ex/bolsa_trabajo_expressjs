const workCtrl = {};

const Users = require("../models/User");
const Works = require("../models/NewJob");
const Apli = require("../models/Aplicant");
const Aple = require("../models/Apler")
const passport = require("passport");


workCtrl.renderWork = async (req, res) => {
    if(req.user.rol == 2){
      const Job = await Works.find({ user: req.user.id });
      const info = await Users.findById(req.user.id).lean();
      res.render("works/empls/index",{info, Job})
      console.log(req.user)
    }else{
      const app = await Apli.find({ user: req.user.id });
      const info = await Users.findById(req.user.id).lean();
      res.render("works/employ/index", {info, app});
      
    }
  };
//codigo empresas
workCtrl.allApli = async (req, res) =>{
  const app = await Aple.find({ apliid: req.params.id });
  res.render("works/employ/aplicates",{app})
}




workCtrl.updaPerfilEmpre = async (req, res) => {
  let errors = [];
  const {name, ubi, email, nivel, telf } = req.body;
  if (name.length <= 0) {
    req.flash("error_msg", "Debe escribir un nombre.");
    res.redirect("/work/registro");
  } 
  else if (ubi.length <= 0) {
    req.flash("error_msg", "Debe escribir su ubicacion.");
    res.redirect("/work/registro");
  }
  else if (email.length <= 0) {
    req.flash("error_msg", "Debe escribir su correo.");
    res.redirect("/work/registro");
  }
  else if (nivel.length <= 0) {
    req.flash("error_msg", "Escriba el tipo de rubro.");
    res.redirect("/work/registro");
  }
  if (telf.length <= 0) {
    req.flash("error_msg", "Escriba su numero de telefono.");
    res.redirect("/work/registro");
  }
   else{

    await Users.findByIdAndUpdate(req.user.id, { name, ubi, email, nivel, telf });
    await Works.updateMany({user: req.user.id}, {name, ubi, nivel, telf  } )
    req.flash("success_msg", "Informacion actualiza con exito");
    res.redirect("/work/registro");
    console.log(Works.name)
  }
  

}
workCtrl.uploadPicEm = async (req, res) => {


  const image = '/uploads/' + req.file.filename;
  await Users.findByIdAndUpdate(req.user.id, { image });
  await Works.updateMany({user: req.user.id}, {image } );
  await Apli.updateMany({userid: req.user.id}, {image } );
  req.flash("success_msg", "Imagen subida con Exito");
  res.redirect("/work/registro");
  

};
workCtrl.changePassEm = async (req, res) =>{
  let errors = [];
  const { password, confirm_password } = req.body;
  if (password != confirm_password) {
    req.flash("error_msg", "Contraseñas no coinciden.");
    res.redirect("/work/registro");
    errors.push({ text: "Contraseñas no coinciden." });
  }
  if (password.length < 4) {
    req.flash("error_msg", "Deben ser mas de 4 caracteres.");
    res.redirect("/work/registro");
  } else {
    // Look for email coincidence
    
      // Saving a New User
      
      const newUser = Users({password}) ;
      newUser.password = await newUser.encryptPassword(password);
      await Users.findByIdAndUpdate(req.user.id, { password : newUser.password  });
      req.flash("success_msg", "Se ah cambiado tu contraseña.");
      res.redirect("/work/registro");
      console.log(newUser)
  }
}
workCtrl.postjob = async(req, res)=>{
  const info = await Users.findById(req.user.id).lean();
  res.render("works/empls/postedjob", {info})
},

workCtrl.deleteWork = async (req, res) => {
  await Works.findByIdAndDelete(req.params.id);
  await Apli.deleteMany({idapli: req.params.id });
  await Aple.deleteMany({apliid:req.params.id })
  req.flash("success_msg", "Se ha Eliminado Correctamente");
  res.redirect("/work/registro");
};

//Buscadores de empleo
workCtrl.rederapli = async (req, res) =>{
  res.render("works/employ/aplicates");

}
workCtrl.uploadPic = async (req, res) => {
  const image = '/uploads/' + req.file.filename;
  await Aple.updateMany({userid: req.user.id}, {image } );
  await Users.findByIdAndUpdate(req.user.id, { image });
  req.flash("success_msg", "Imagen subida con Exito");
  res.redirect("/work/registro");
  console.log(image)
};

workCtrl.updaperfil = async (req, res) => {
  let errors = [];
  const {name, apds, email, nacimiento, nivel , genero, telf } = req.body;
  if (name.length <= 0) {
    req.flash("error_msg", "Debe escribir un nombre.");
    res.redirect("/work/registro");
  } 
  else if (apds.length <= 0) {
    req.flash("error_msg", "Debe escribir sus apellidos.");
    res.redirect("/work/registro");
  }
  else if (email.length <= 0) {
    req.flash("error_msg", "Debe escribir su correo.");
    res.redirect("/work/registro");
  }
  else if (nacimiento.length <= 0) {
    req.flash("error_msg", "Coloque su fecha de nacimiento.");
    res.redirect("/work/registro");
  }
  if (genero.length <= 0) {
    req.flash("error_msg", "Elija su genero.");
    res.redirect("/work/registro");
  }
  if (telf.length <= 0) {
    req.flash("error_msg", "Escriba su numero de telefono.");
    res.redirect("/work/registro");
  }
   else{
    await Users.findByIdAndUpdate(req.user.id, { name, apds, email, nacimiento, genero, telf, nivel });
    req.flash("success_msg", "Informacion actualiza con exito");
    res.redirect("/work/registro");
    console.log(req.body)
  }
  

}

workCtrl.changepass = async (req, res) =>{
  let errors = [];
  const { password, confirm_password } = req.body;
  if (password != confirm_password) {
    errors.push({ text: "Passwords do not match." });
  }
  if (password.length < 4) {
    errors.push({ text: "Passwords must be at least 4 characters." });
  }
  if (errors.length > 0) {
    res.render("works/employ/index", {
      errors,
      password,
      confirm_password
    });
  } else {
    // Look for email coincidence
    
      // Saving a New User
      
      const newUser = Users({password}) ;
      newUser.password = await newUser.encryptPassword(password);
      await Users.findByIdAndUpdate(req.user.id, { password : newUser.password  });
      req.flash("success_msg", "Se ah cambiado tu contraseña.");
      res.redirect("/work/registro");
      console.log(newUser)
  }

}
workCtrl.deleteApli = async (req, res) => {
  await Apli.deleteMany({idapli: req.params.id });
  await Aple.deleteMany({apliid:req.params.id })
  req.flash("success_msg", "Se ha Eliminado Correctamente");
  res.redirect("/work/registro");
};

module.exports = workCtrl;