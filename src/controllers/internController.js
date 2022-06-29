const internModel = require("../models/internModel");
const { default: mongoose } = require("mongoose");

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    if (typeof value === Number && value.trim().length === 0) return false
    return true
}

// const isValidEmail = function(value){
//     if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))){
//         return res.status(400).send({status: false, msg:"Please enter a valid Email Id"});
//     }
// }

// const isValidMobile = function(value){
    // if(!(/^\d{10}$/.test(value))){
        
//     }
// }

const createIntern= async function(req,res){
    try{

        let data=req.body
        
        const {name,email,mobile,collegeName} =data;

        if (Object.keys(data).length==0) { return res.status(400).send({ status: false, msg: "You must enter data." }) }

        if (!name) { return res.status(400).send({ status: false, msg: "name is mandatory" }) }
        if (!(/^[a-zA-Z]+$/.test(name.trim()))) { return res.status(400).send({ status: false, msg: "Enter valid name." }) }

        if (!email) { return res.status(400).send({ status: false, msg: "email is mandatory" }) }

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email.trim()))) { return res.status(400).send({ status: false, msg: "Enter a valid emailId." }) }

        if(!mobile) { return res.status(400).send({ status: false, msg: "mobile no is mandatory" }) }
        if(!(/^\d{10}$/.test(value))){ return res.status(400).send({ status: false, msg: "Enter valid mobile no." }) }

        let internData= await internModel.create(data)
        res.status(201).send({status: true, msg: "Intern Created successfully", data: internData});
    }

catch(err){
    res.status(500).send({status: false,msg:err.message})
}
}


module.exports.createIntern=createIntern