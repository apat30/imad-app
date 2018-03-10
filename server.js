//Importing certain pakages in the below 3 lines
var express = require('express');//To create web servers, listens on the port and handles HTTP connection
var morgan = require('morgan');//Output logs of server
var path = require('path');
var Pool= require('pg').Pool;
var crypto= require('crypto');

var config= {
    user: 'aditi3049',
    database: 'aditi3049',
    host: 'db.imad.hasura-app.io',
   port:'5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles=
{
    'Article-one':
    {
        title:'Article One | Aditi Patade',
        heading:'Article One',
        date: 'Feb 20, 2018',
        content: ` <p>
                        This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app.
        
                    </p>
                    <p>
                        This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app.
        
                    </p>
                    <p>
                        This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app. This is content for my first app.
        
                    </p>`,
    },
    'Article- two':
    {
        title:'Article Two | Aditi Patade',
        heading:'Article Two',
        date:'Feb 21, 2018',
        content: ` <p>
                        This is content for my second article.
        
                    </p>`,
        
    },
    'Article-Three':
    {
        title:'Article Three | Aditi Patade',
        heading:'Article Three',
        date: 'Feb 22 2018',
        content: ` <p>
                        This is content for my third article.
                        </p>`,
        
    },
};
function createTemplate(data)
{
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;


        var htmlTemplate= `
        <html>
            <head>
                <title>
                     ${title}
                </title>
                <meta name="width= device-width, initial-scale=1"/>
                <link href="/ui/style.css" rel="stylesheet" />
            </head>
            
            <body>
                <div class="Container">
                    <div>
                        <a href="/">Home</a>    //Hyperlink
                    </div>
                    <div>                       //A section
                        ${heading}
                    </div>
                    <hr/>                       //Horizontal line
                    <div>
                       ${date}
                    </div>
                    <div>
                       ${content}
                    </div>
                </div>
            </body>
        </html>
        `;
    return htmlTemplate;
}

function hash(input, salt)
{
    //How do we create the hash
    var hashed= crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}
app.get('/hash/:input', function(req, res)
{
    var hashedString= hash(req.params.input,'This-is-some-random-string');
}
);

var pool= new pool(config);

app.get('/Test-db', function(req, res)
{
    //make a select request
    //Return response with a result
    pool.query('SELECT * FROM "Test"', function(err, result){
        if(err)
            {
                res.status(500).send(err.toString());
            }
        else
            {
                res.send(JSON.stringfy(result.rows));
            }
    });
});

//URL Handlers. Text responders
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res){
    var articleName= req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
}); 
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
