require('dotenv').config()
const express = require('express')
const app = express()

const PORT = process.env.PORT || 5000

const https = require('https')
const path = require('path')
const hbs = require('hbs')

// console.log("Dire Name: ",__dirname);
// console.log("File NAame: ",__filename);

const staticFileDir = path.join(__dirname, "../public")
const partialFiles = path.join(__dirname, '../views/layout')

app.set('view engine', 'hbs')
app.use(express.static(staticFileDir))
hbs.registerPartials(partialFiles)

const getApiData = (url, cb) => {

    let req = https.request(url,(res)=>{
        let data = ""
        res.on('data', (result)=>{
            data += result
        })

        res.on('end', ()=>{
            data = JSON.parse(data)
            cb(data)
        })
    })    

    req.on('error', (err)=>{
        console.log(err);
    }) 

    req.end()  
}


app.get('', (req, res)=> {   
 
    getApiData('https://jsonplaceholder.typicode.com/posts', (posts)=>{

        res.render('home',{
            name:"Mohamed Abdel-Samie", 
            pageTitle: "Home",  
            posts  
        })     
    
    })
     
})  

app.get('/contact', (req, res)=> {
    res.render('contact', {
        pageTitle: "Contact" 
    })
})  
  
app.get('/table', (req, res)=> {  
    res.render('table', {
        pageTitle: "Table"    
    })
})

app.get('*', (req, res)=>{
    res.render('error404',{
        pageTitle: "Error 404" 
    })
})

app.listen(PORT, ()=>{
    console.log(`Server run at http://localhost:${PORT}`);
})