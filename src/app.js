const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express(); 


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')

const partialPaths = path.join(__dirname,'../templates/partials')

//Set handlebars engine and views locationss
app.set('view engine','hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialPaths)

let previsione='';
//Set static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Piero de Cassan'
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({error:'no address defined'})
    }

    geocode(req.query.address,(error, {latitude, longitude, location} = {})=>{

        if(error) {
            return res.send({error});      
        } 
    
        forecast(latitude, longitude, (error, foreCastdata)=> {
            if (error) {
                return res.send({error});   
            }

            res.send({
                forecast:foreCastdata,
                location,
                address:req.query.address
            })
        })
    })


    
})



app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Piero de Cassan'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        name:'Piero de Cassan'
    })
})

app.get('/weather',(req, res)=>{
    res.send({
        location:'treviso',
        temperature:18.00
    })
})

app.get('*/help/*',(req,res)=>{
    res.send('help page dont exist')
})

app.get('*',(req,res)=>{
    res.send('My 404 page')
})
app.listen(3000,() => {
    console.log('the server is up and running on port 3000!');
})