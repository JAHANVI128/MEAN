const industryModel = require('../model/industryModel')
const CsvReaderService = require('../services/csvreader')

module.exports.uploadIndustry = async function(req,res){

    let allIndustry = await CsvReaderService.uploadIndustry()

    industryModel.insertMany(allIndustry).then(data => {
        
        res.json({
            data:allIndustry,
            msg:"Industries uploaded",
            status:200
        })
        
    })
}