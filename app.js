var express = require('express');
var path= require('path');
var bodyParser=require('body-parser');
var nodemailer= require('nodemailer');

var app= express();
const port =process.env.port || 8080;
app.set('views',path.join(__dirname,'views'));
app.set('view engine','jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

//For server side it is used console.log('Hello World');
  //For client Side
  //res.send('<h1>Hello World</h1>');
  //We could even put html in it using <h1> tag
app.get('/',function(req,res){
  res.render('index',{title:'Welcome'});
});

app.get('/about',function(req,res){
  res.render('about');
});

app.get('/contact',function(req,res){
  res.render('contact');
});

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'dhairya.chugh77@gmail.com',
			pass: 'upes@2018'
		}
	});

   var mailOptions = {
   	from: 'Dhairya <dhairya.chugh77@gmail.com>',
   	to: 'dhairya.chugh77@gmail.com',
   	subject: 'Details Submitted',
    text: 'You have a submission with the following details... Name: '+req.body.name+'Email: '+req.body.email+ 'Message: '+req.body.message,
   	html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message:'+req.body.message+'</li></ul>'

   };
   transporter.sendMail(mailOptions, function(error, info){
   	if(error){

   		console.log(error);
   		res.redirect('/');
   	}else{
   		console.log('Message Send: '+info.response);
   		res.redirect('/');
   	}


   });
});

app.listen(port);
console.log('Server is running on desired port');
