const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const router = express.Router();
const app = express();
const queries = require('./queries');
const handler = require('./handler');
const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : ''
});
app.use(bodyparser.json());
const executor = new handler(pool);

router.get('/execute/:function',async (req,res) => {
    try {
        console.log(req.params.function)
        console.log(Object.keys(queries));
        if(Object.keys(queries).indexOf(req.params.function) === -1) {
            return res.send('Invalid MySQL call');
        }
        let query = queries[req.params.function];
        console.log(query)
        let data = await executor.executeMethod(query);
        res.json(data);
    } catch(e) {
        res.send(e);
    }
});

app.use('/api', router);
app.listen(3000);
console.log('Listening to the 3000 port');