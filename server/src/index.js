//packages tika
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
// express ethule app kiyal property ekk thiyenawa eeka mehema gannawa ,
//express eke thiyena method tikata access karanna puluwan me app haraha den

require("dotenv").config();

console.log(process.env.APP_id);

//middle wares
//front end ekai back end ekai athara daththta huwamaru wimata awashya middle ware thiyenaw
app.use(express.json());//express eken json method eka gann
app.use(cors());

//all currences
app.get("/getAllCurrencies", async (req, res) => {//cilent side eken request eka enwa, dn responce eka denna one
    //response eka denna currency tik store karann inna onene eenisa  
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=504781c7cf9c4e019c036a8312ce18c9";
    //den me url ekat req ekk denawa curreny tika gnna


    
    try {
        const namesResponce = await axios.get(nameURL);//get request eken request karanawa data ganna namesResponse ekat
        const nameData = namesResponce.data;//responce eke thiyena data tika nameData walata ganna
        return res.json(nameData);//return karanna client paththat data tika json format eken

    } catch (err) {
        console.error(err);

    }

});

//get to target amount
app.get("/convert" ,async (req , res)=>{
    const
    {date,
    sourceCurrency,
    targetCurrency,
    amountInSourceCurrency}=req.query;

    try {

        const dataUrl =`https://openexchangerates.org/api/historical/${date}.json?`

        const dataResponce = await axios.get(dataUrl);
        const rates = dataResponce.data.rates;

        //rates
        const sourceRate=rates[sourceCurrency];
        const targetRate=rates[targetCurrency];

        //final target val
        const targetAmount=(targetRate /sourceRate) * amountInSourceCurrency;

        return res.json(targetAmount);
    } catch (err) {
        console.error(err);
        

        
    }
})



//listen to port 
//server side eka port ekakata access dimata
//server side ekai client side ekai ekama port eke run karanna ba client port 3000 run wena nisa wena port ekak denna
app.listen(5000, () => {
    console.log("SERVER STARTED");
})