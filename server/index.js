//load the filesystem core nodejs package so we can read and write to the FS
const fs = require('fs');
//load in the express and express-session packages
const express = require('express')
const session = require('express-session')
var sleep = require('sleep');
SHA256 = require('sha256');
var zxcvbn = require('zxcvbn');


//get the bodyparser middleware package
const bodyparser = require('body-parser')

//call express to get an app object, to be used like in php/slim
const app = express()

//setup the port we want to use
const port = 3000
//setup the filepath to read and write DB to
const dbFilePath = 'db/database.json'

//lets load our database into memory
let db;
try{
	let rawdata = fs.readFileSync(dbFilePath);  
	db = JSON.parse(rawdata);
}catch (e){
	//cant read file, make a blank db to use
	db = {};
}
console.log("DB",JSON.stringify(db));


//setup session
//its always on, no need to session_start
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}))

// to support URL-encoded bodies like what our forms will Post us
app.use(bodyparser.urlencoded({extended: true})); 

//register a listener for GET requests to / and return 'Hello World' as our response
app.get('/', (req, res) => {
	return res.send('Hello World!')
});

let working = false;

app.post('/sha256',(req,res)=>{

	console.log("in /sha256\n");
	const spawn = require("child_process").spawn;
	const pythonProcess = spawn('python',["../scripts/shaLookup.py", req.body.sha256]);
	pythonReturn = null;

	if(working == false){
		working = true;

		pythonProcess.stdout.on('data', (data) => {
			let message = JSON.stringify(`${data}`);
			let remove = message.replace(/"/g, '')
			let finalMessage = remove.replace(/\\n/g, '');
			console.log(finalMessage);
			res.redirect(302, 'login.html#' + finalMessage);
			working = false;
		});

		pythonProcess.stderr.on('data', (data) => {
			console.log(`stderr: ${data}`);
			res.redirect(302, 'login.html#Error Occurred');
			working = false;
		});
	}

})

app.use(express.static('static'))

app.listen(port, () => console.log(`Project 4 listening on port ${port}!`))
