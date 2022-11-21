const express = require('express');
const { createCollege, collegeDetails } = require('../controllers/collegeController');
const { createIntern } = require('../controllers/internController');
const router = express.Router();


router.post("/functionup/colleges", createCollege);
router.post("/functionup/interns", createIntern);
router.get("/functionup/collegeDetails", collegeDetails);

module.exports = router;


//Amazon s3 Link    https://functionup-stg.s3.ap-south-1.amazonaws.com/thorium/_____.png|jpeg|jpg
//aasc.jpg