const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes');

//express App
const app = express();
//connect to mongoDB
const dbURI = '  ' //Add YOur MongoDB application URL as dbURI's value ;
mongoose.connect(dbURI)
.then((result)=> app.listen(4000))
.catch((err)=>console.log(err)); 

// Middleware and static files
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));                                       
app.use(morgan('dev'));


//register view ejs 
app.set('view engine', 'ejs');



app.get('/',(req,res)=>{
  res.redirect('/blogs');
});


app.get('/about',(req,res)=>{
    res.render('about', { title : 'AboutPage' });
});

//blog routes
app.use('/blogs',blogRoutes);

//404 error page
app.use((req,res)=>{
    res.status(404).render('404', { title : '404' });
});
