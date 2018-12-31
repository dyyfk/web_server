const express = require('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();
var path = require('path'); //TODO: delete this var afterwards

const port = process.env.PORT || 3000;


hbs.registerPartials(__dirname+'/views/partials');
app.set('view engine','hbs');

//app.use((req,res,next)=>{
//	res.render('maintenance.hbs');
//	
//	next();
//});

app.use(express.static(__dirname+'/public'));
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

app.get('/chessBoard',(req,res)=>{
   res.sendFile('chessBoard.html', {root: path.join(__dirname, './public')}) //TODO: fix this now temporialy fixed
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

