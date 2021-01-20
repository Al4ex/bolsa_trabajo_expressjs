const router = require("express").Router();

// Controller
const {
    createNewJob,
    renderJobs,
    renderJob,
    renderPostJ
} = require("../controllers/job.controller");

// Helpers
const { isAuthenticated } = require("../helpers/auth");

router.post("/new_job", isAuthenticated, createNewJob);
router.get("/all-jobs", renderJobs);
router.get("/all-jobs/job/:id", renderJob)
router.post("/apli", renderPostJ)


module.exports = router;