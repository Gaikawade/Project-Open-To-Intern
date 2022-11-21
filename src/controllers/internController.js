const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel");
const { sendError } = require("../Middleware/errors");

const createIntern = async function (req, res) {
    let data = req.body;

    if (Object.keys(data).length == 0) {
        return sendError(res, "You must enter data" );
    }

    const { name, email, mobile, collegeName } = data;

    //?checking whether all the required inputs are given or not
    if (!name) {
        return sendError(res, "Name field if missing" );
    }
    if (!email) {
        return sendError(res, "Email field is missing" );
    }
    if (!mobile) {
        return sendError(res, "Mobile number field is missing" );
    }
    if (!collegeName) {
        return sendError(res, "Please enter College name in order to apply for the Intern");
    }

    //?checking the format of the inputs
    if (name.trim().length !== 0) {
        if (!/^[a-zA-Z_ ]+$/.test(name)) {
            return sendError(res, "Enter valid name" );
        }
    } else {
        return sendError(res, "Enter valid name" );
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return sendError(res, "Enter a valid emailId" );
    }
    if (!/^[6-9]\d{9}$/.test(mobile)) {
        return sendError(res, "Enter valid mobile no" );
    }

    //?checking whether unique attributes are present in our DB or not
    let getEmail = await internModel.findOne({ email });
    if (getEmail) {
        return sendError(res, `This Email Id is already registered. Enter a new email`);
    }
    let getMobile = await internModel.findOne({ mobile });
    if (getMobile) {
        return sendError(res, "This Mobile number is already registered .Enter a new mobile number");
    }

    //?checking for the college document in the DB
    let getCollege = await collegeModel.findOne({ name: collegeName });
    if (!getCollege) {
        return sendError(res, "No college is listed with that College name");
    }
    if (getCollege.isDeleted == true) {
        return sendError(res, "Presently the college is not accepting any interns");
    }

    let result = {
        name: name,
        email: email,
        mobile: mobile,
        collegeId: getCollege._id,
    };

    let internData = await internModel.create(result);
    let updateData = await internModel
        .find(internData)
        .select({ name: 1, email: 1, mobile: 1, collegeId: 1 });

    res.status(201).send({ msg: "Intern Created successfully", document: updateData });
};

module.exports = { createIntern };
