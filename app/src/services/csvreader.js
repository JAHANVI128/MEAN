const fs = require("fs")
const CsvReader = require("csv-reader");
const IndustryModel = require("../model/industryModel");
const EqModel = require("../model/eqModel")

function readFile() {

    let myfile = fs.createReadStream("./seed/ind_nifty50list.csv", "utf-8")

    myfile.pipe(new CsvReader({
        parseNumbers: true,
        parseBooleans: true,
        trim: true
    })).on('data', function (row) {
        console.log('A row arrived', row);
    }).on('end', function () {
        console.log('File read ended');
    })
}

// function insertJSONData(db) {
//     const collection = db.collection('');

//     collection.insertOne(jsonData, (err, result) => {
//       if (err) {
//         console.error('Error inserting document:', err);
//       } else {
//         console.log('Document inserted:', result.insertedId);
//       }

//       // Close the MongoDB connection when done
//       client.close();
//     });
//   }

// read industry data from csv

module.exports.uploadIndustry = async function() {

    let industryArray = [];
    let myFile = fs.createReadStream("./seed/ind_nifty50list.csv", "utf-8")
    let myDataFromDb = [] 
    
    IndustryModel.find().then(data => {
        myDataFromDb = data
    })

    let promise = new Promise((resolve,reject) => {
        
        myFile.pipe(new CsvReader()).on('data',function(row){
    
            // let ind = row[1];
            // industryArray.push(ind)
    
            if(industryArray.indexOf(row[1].toLowerCase()) == -1){
                industryArray.push(row[1].toLowerCase)
            }
    
        }).on('end',function(end){
    
            console.log(industryArray);
            console.log("\n"+industryArray.length);
            // return industryArray;

            console.log("dbLength ",myDataFromDb.length);
            console.log("*******"+myDataFromDb)
            for(i = 0;i < myDataFromDb.length;i++){
                if(industryArray.indexOf(myDataFromDb[i].name.toLowerCase()) != -1){
                    delete industryArray[industryArray.indexOf(myDataFromDb[i].name)]
                }
            }

            let industryJson = []
            industryArray.forEach(item => industryJson.push({
                "name":item
            }))

            console.log(" =====> ");
            console.log(industryJson);

            resolve(industryArray)
        })
    
    })
    let data = await promise;
    console.log("THE END");
    return data;
}

//equity

module.exports.uploadEquity = async function() {

    let eqArray = [];
    let myFile = fs.createReadStream("./seed/ind_nifty50list.csv", "utf-8")
    let industryDb = [];
    let equityDb = [];

    IndustryModel.find().then(data => {
        industryDb = data;
    })
  
    await EqModel.find().then( data => {
        // equityDb = data;
        data.forEach(item => equityDb.push(item.name))
        
    })

    let promise = new Promise((resolve,reject) => {
        
        myFile.pipe(new CsvReader()).on('data',function(row){

            let industryName = row[1]
            console.log("equityDb");
            console.log(equityDb);

            for(let i=0;i<industryDb.length;i++){
                if(industryDb[i].name.toLowerCase() == industryName.toLowerCase() && equityDb.indexOf(row[0].toLowerCase()) == -1){

                    let eq ={
                        name:row[0],
                        symbol:row[2],
                        isin:row[4],
                        industryId:industryDb[i]._id
                    }
                    eqArray.push(eq);
                }
            }
      
        }).on('end',function(end){
    
            // for( let j=0;j<equityDb.length;j++){
            //     if(equityDb[j].name.toLowerCase() == row[0].toLowerCase()){

            //     }
            // }

            resolve(eqArray)
        })
    
    })
    let data = await promise;
    console.log("THE END");
    return data;
}