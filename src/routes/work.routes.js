const express = require('express');
const router = express.Router();


const {
    renderWork,
    postjob,
    uploadPic,
    changepass,
    updaperfil,
    updaPerfilEmpre,
    uploadPicEm,
    rederapli,
    allApli,
    deleteWork,
    deleteApli
} = require('../controllers/work.controllers')

const {isAuthenticated} = require('../helpers/auth');

router.get('/work/registro', isAuthenticated, renderWork);

router.post('/update_empre', isAuthenticated, updaPerfilEmpre);
router.post('/uploadPicEm', isAuthenticated, uploadPicEm)
router.get('/work/posted-job', isAuthenticated, postjob);
router.get('/work/registro/allApli/:id', isAuthenticated, allApli)
router.delete('/work/delete/:id', isAuthenticated, deleteWork)


router.post('/workerprofile', isAuthenticated, uploadPic);
router.post('/changepass', isAuthenticated, changepass);
router.post('/updateperf', isAuthenticated, updaperfil);
router.get("/aplication", isAuthenticated, rederapli)
router.delete('/work/delets/:id', isAuthenticated, deleteApli)


module.exports = router;

