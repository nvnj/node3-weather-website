

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./geocode.js')



const app = express()

const cors = require('cors')


app.use(cors());

const publicDir=path.join(__dirname,'../public')
const partialPath = path.join(__dirname,'../partials')

app.set('view engine','hbs')
app.use(express.static(publicDir))
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Naveen John'

    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About page',
        name:'Naveen John'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help page',
        msg:'This is a help page',
        name:'Naveen John'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.location){
        return res.send({
            error:'You must select a location'
        })
    }
    geocode(req.query.location,(error,response)=>{
        if(error){
            
            return res.send({error})
        }
            res.send(response)
            console.log(error)
        })

    })
   


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
})

app.get('/help/*',(req,res)=>{
    res.render('404help',{
        title:'404 error',
        msg:'Help content not found',
        name:'Naveen John'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404 error',
        msg:'Page not found',
        name:'Naveen John'
    })
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})