const EqModel = require('../model/eqModel')
const CsvReaderService = require('../services/csvreader')

module.exports.uploadEquity = async function(req,res){

    let allEq = await CsvReaderService.uploadEquity()

    EqModel.insertMany(allEq).then(data => {

        res.json({
            data:allEq,
            msg:"Equities uploaded",
            "status":200
        })
    })
}

module.exports.getAllEquity = function(req,res){

    EqModel.find().populate("industryId").exec().then(data => {
        res.status(200).json({    //502   400
            msg:"Equity Retrieved",
            data:data
        }).catch(err => {         //.status(200)
            res.status(302).json({    
                msg:"Something Went Wrong",
                data:err
            })             
        })
    })
}

