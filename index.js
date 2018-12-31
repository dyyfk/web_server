const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();

const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

//app.use((req,res,next)=>{
//	res.render('maintenance.hbs');
//	
//	next();
//});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
	return text.toUpperCase();
});

app.use((req, res, next)=>{
	var now = new Date().toString();
	var text = `${now}: ${req.method} ${req.url}`;
	fs.appendFileSync('server.log', text+'\n');
	next();
});


app.get('/project',(req,res)=>{
	res.render('project.hbs',{
		pageTitle: 'Project',
		url: 'https://github.com/dyyfk/web_server'
	});
});
app.get('/',(req,res)=>{
	res.render('home.hbs',{
		pageTitle: 'home',
		welcomeMeg: 'Welcome',
	});
});

app.get('/about',(req,res)=>{
	res.render('about.hbs',{
	   pageTitle: 'About Page',
	});
});

app.listen(port,()=>{
	console.log(`listening to port ${port}`);
});

