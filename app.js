
// Requiring dependencies and required data
const express = require('express')
const data = require('./data.json')
const projects = data.projects;

// Setting up our application
const app = express()

// Directing the app to where it can find the static resources for the browser
app.use(express.static('public'))

// Defining pug as the view engine so we can use our templates
app.set('view engine', 'pug');

// Routing section

app.get('/', (req, res) => {
    res.render('index',{'projects':projects})
})

app.get('/about', (req, res) => {
    res.render('about')
})

// using the id parameter to load a page for each individual project
app.get('/project/:id', (req, res) => {
    res.render('project',{'project':projects[req.params.id]})
})

// 404 error handler
app.use((req,res,next)=>{
    const err = new Error('Page Not Found');
    err.status = 404;
    res.render('page-not-found',{'err':err})
})

// generic error handling
app.use((err,req,res,next)=>{
    res.locals.error = err;
    err.status= 500;
    res.render('error');
})

app.listen(3000)
console.log('listening on port 3000');