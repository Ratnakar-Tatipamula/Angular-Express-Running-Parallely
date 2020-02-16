const express = require('express');
const router = express.Router();

router.get('/',function(req,res){
    res.send('api works');
    console.log("hello");
});

module.exports = router;