const jobsCtrl = {};
const dateFormat = require("dateformat");
dateFormat.i18n = {
  dayNames: [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "jueves",
    "Viernes",
    "Sabado",
  ],
  monthNames: [
    "En",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
};

// Models
const Works = require("../models/NewJob");
const Users = require("../models/User");
const Apli = require("../models/Aplicant");
const Aplicants = require("../models/Apler");
const passport = require("passport");

jobsCtrl.createNewJob = async (req, res) => {
  const { title, jobduration, exper, description, sueldo, times } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Porfavor, escribe un titulo." });
  }
  if (!description) {
    errors.push({ text: "Please Write a Description" });
  }
  if (errors.length > 0) {
    res.render("works/empls/postedjob", {
      errors,
      title,
      description,
    });
  } else {
    const newJob = new Works({
      title,
      jobduration,
      exper,
      description,
      sueldo,
      times,
    });
    newJob.user = req.user.id;
    newJob.name = req.user.name;
    newJob.ubi = req.user.ubi;
    newJob.nivel = req.user.nivel;
    newJob.telf = req.user.telf;
    newJob.image = req.user.image;

    await newJob.save();
    req.flash("success_msg", "Trabajo Puclicado");
    res.redirect("/work/posted-job");
  }
};

jobsCtrl.renderJobs = async (req, res) => {
  const job = await Works.find();
  const dateform = dateFormat(job.createdAt, "dd/mm/yyyy h:MM TT");
  res.render("works/empls/jobs", { job, dateform });
  console.log(dateform);
};

jobsCtrl.renderJob = async (req, res) => {
  if (req.user) {
    if (req.user.rol == 1) {
      const job = await Works.findById(req.params.id).lean();
      res.render("works/employ/perfil-job", { job });
    } else {
      const job = await Works.findById(req.params.id).lean();
      res.render("works/perfil-job", { job });
    }
  } else {
    const job = await Works.findById(req.params.id).lean();
      res.render("works/perfil-job", { job });
    
  }
};

jobsCtrl.renderPostJ = async (req, res) => {
  const {
    pliid,
    title,
    jobduration,
    exper,
    description,
    sueldo,
    times,
    name,
    idapli,
    userid,
    ubi,
    nivel,
    telf,
    image,
  } = req.body;

  const verUser = await Apli.findOne({ user: req.user.id });
  const emailUser = await Apli.findOne({ idapli: pliid });
  if (verUser) {
    if (emailUser) {
      req.flash("error_msg", "Ya se ha solicitado este empleo.");
      res.redirect("/all-jobs");
    } else {
      const newApli = new Apli({
        title,
        jobduration,
        exper,
        description,
        sueldo,
        userid,
        times,
        name,
        idapli,
        ubi,
        nivel,
        telf,
        image,
      });
      const newAple = new Aplicants({ apliid: idapli, userid: req.user.id });
      newAple.name = req.user.name;
      newAple.apds = req.user.apds;
      newAple.email = req.user.email;
      newAple.nacimiento = req.user.nacimiento;
      newAple.genero = req.user.genero;
      newAple.telf = req.user.telf;
      newAple.nivel = req.user.nivel;
      newAple.image = req.user.image;
      newAple.user = req.user.id;
      newApli.user = req.user.id;
      await newApli.save();
      await newAple.save();
      const job = await Works.findById(req.params.id).lean();
      res.redirect("/all-jobs");
    }
  }else{
    const newApli = new Apli({
      title,
      jobduration,
      exper,
      description,
      sueldo,
      userid,
      times,
      name,
      idapli,
      ubi,
      nivel,
      telf,
      image,
    });
    const newAple = new Aplicants({ apliid: idapli, userid: req.user.id });
    newAple.name = req.user.name;
    newAple.apds = req.user.apds;
    newAple.email = req.user.email;
    newAple.nacimiento = req.user.nacimiento;
    newAple.genero = req.user.genero;
    newAple.telf = req.user.telf;
    newAple.nivel = req.user.nivel;
    newAple.image = req.user.image;
    newAple.user = req.user.id;
    newApli.user = req.user.id;
    await newApli.save();
    await newAple.save();
    const job = await Works.findById(req.params.id).lean();
    res.redirect("/all-jobs");
  }
  console.log(verUser);
};

module.exports = jobsCtrl;
