const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const mongoose = require("mongoose");
const { sendError } = require("../Middleware/errors");

//?Create College

const createCollege = async function (req, res) {
    let data = req.body;
    let { name, fullName, logoLink } = data;

    if (Object.keys(data).length == 0) {
        return sendError(res, "Data is required" );
    }

    //?checking whether all the required inputs are given or not
    if (!name) {
        return sendError(res, "Name field is missing" );
    }
    if (!fullName) {
        return sendError(res, "Full Name field is missing" );
    }
    if (!logoLink) {
        return sendError(res, "Logo Link field is missing" );
    }

    //?checking the Validation of the inputs
    if (name.trim().length !== 0) {
        if (!/^[a-zA-Z]+(-[a-zA-Z]+)?$/.test(name)) {
            return sendError(res, "Enter valid name" );
        }
    } else {
        return sendError(res, "Opps! invalid  name" );
    }

    if (fullName.trim().length !== 0) {
        if (!/^[a-zA-Z_ ,]+$/.test(fullName)) {
            return sendError(res, "Enter valid Full name" );
        }
    } else {
        return sendError(res, "Opps! invalid Full name" );
    }

    const checkLink = /(http|https(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|jpeg)/;
    if (!checkLink.test(logoLink)) {
        return sendError(res, "Enter a valid logolink" );
    }

    //?Checking whether unique attributes are present in the DB or not
    let getCollegeName = await collegeModel.findOne({ name });
    if (getCollegeName) {
        return sendError(res, `${name} is already listed`);
    }

    //?creating college document with the given inputs
    let collegeData = await collegeModel.create(data);

    res.status(201).send({ msg: 'College Data', data: collegeData });
};

const collegeDetails = async function (req, res) {
    let queryData = req.query;

    //?checking whether the required input is given or not
    if (Object.keys(queryData).length == 0) {
        return sendError(res, "Please include some request in filter");
    }

    let collegeName = req.query.collegeName;

    if (Object.keys(queryData).length > 1) {
        return sendError(res, "Please include college name key only");
    }
    if (!collegeName) {
        return sendError(res, "Please provide college name Key 🔴");
    }
    if (collegeName.trim().length == 0) {
            return sendError(res, "collegeName can't be empty space");
    }

    //?finding the college document with the college name
    let collegeDetails = await collegeModel.findOne({ name: collegeName });

    if (!collegeDetails) {
        return sendError(res, "College is not listed" );
    }

    //?finding the intern document with the college document id
    let internDetails = await internModel
        .find({ collegeId: collegeDetails._id })
        .select({ name: 1, email: 1, mobile: 1, _id: 1 });

    if (internDetails.length == 0) {
        return sendError(res, "No intern has applied for this college");
    }

    let result = {
        name: collegeDetails.name,
        fullName: collegeDetails.fullName,
        logoLink: collegeDetails.logoLink,
        interns: internDetails,
    };
    res.status(200).send({ msg: 'Interns Data', data: result });
};

module.exports = { createCollege, collegeDetails };