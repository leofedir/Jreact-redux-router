
const pgdb = require('../libs/pgdb')();

module.exports = function (router){

    router.post('/bezrobitni' , function (req , res) {
        pgdb.query(`SELECT * FROM test6 `)
            .then((d)=>{
                res.json({'state' : true , data: d});
            })
            .catch((e)=>{
                console.log("Error" , e);
            })
    });

}