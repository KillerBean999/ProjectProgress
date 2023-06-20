const express = require('express')
const app = express()

const {getAllAirlineCompanies,
    getAirlineById,
    addAirline,
    updateAirline,
    removeAirline} = require ('./DataBase/airlineCompaniesDB')

const bodyParser = require('body-parser')
app.use(bodyParser.json())//adding body parser to express 

//imports from connection.js
const {connection, knex} = require('./DataBase/connection') 

//checking database connection
connection.connect((err)=>{     
    if (err) {
        console.log(err);
    } else {
        console.log("connected to the database");
    }
})

/////////////////////////API/////////////////////////////
app.get("/api/getAllAirlineCompanies", async (req, res) => {
    //http://localhost:3000/api/getAllAirlineCompanies
    const result = await getAllAirlineCompanies()
    res.json(result[0])
})
  
//getAirlineById 
app.get("/api/getAirlineById/:id", async (req, res)=>{
    //http://localhost:3000/api/getAirlineById/:id
    const id = req.params.id
try{
    const result = await getAirlineById(id)
    res.json(result)
}catch(err){
    res.status(500).send("Error: "+err)
}
})

app.post("/api/addAirline", async (req, res)=>{
  //http://localhost:3000/api/addAirline
  try{
    const newAirline = req.body
    const result = await addAirline(newAirline)
    res.json(result)
  } catch (err) {
    console.log("Error: "+err)
    res.status(500).send("Error: "+err)
  }
})
app.put("/api/updateAirline/:id", async (req, res) =>{
    //http://localhost:3000/api/updateAirline/:id
    try{
    const IdAirline = req.params.id
    const updatedAirline = req.body
    const newAirlineName = updatedAirline.airline_name
    const result = await updateAirline(newAirlineName, IdAirline)
    res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
})

app.delete("/api/removeAirline/:id ", async (req, res) =>{
    //http://localhost:3000/api/removeAirline/:id
    try{
    const IdtoRemove = req.params.id
    const result = await removeAirline(IdtoRemove)
    res.json(result)
    } catch (err) {
        console.log("Error: "+err)
        res.status(500).send("Error: "+err)
    }
})
/////////////////////////API/////////////////////////////
///////////////////////DB QUERY/////////////////////////

///////////////////////DB QUERY/////////////////////////
//////////////////////STAYS FINAL///////////////////////
app.listen(3000, (err) =>{ //http/localhost3000/api/,...
    if(err) console.log(err)
    else console.log("Server is running on port 3000")
})
//////////////////////STAYS FINAL///////////////////////
