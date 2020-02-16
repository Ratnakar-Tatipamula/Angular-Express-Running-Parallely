
const port = 3000;
var express = require('express');
var app = express();
const path = require('path');
const bodyparser = require('body-parser');

 const api = require('./server/routes/api');

 app.use('/api',api);

//app.use(express.static(path.join(__dirname,'dist/my-app')))

app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());

app.get('*',(req,res)=>{
         //res.sendFile(path.join(__dirname,'dist/my-app/index.html'));
        // res.sendFile(path.join(__dirname, 'dist/my-app/index.html'));
        // res.sendFile(path.join(__dirname, './src', 'index.html'));
   });
    

app.listen(port,function(){
    console.log("Server running on localhost:" + port);
});

