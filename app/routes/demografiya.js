
const pgdb = require('../libs/pgdb')();

module.exports = function (router){

    router.post('/test' , function (req , res) {
        pgdb.query(`SELECT * FROM geodata WHERE item_type > $1` , [1])
            .then((d)=>{

            })
            .catch((e)=>{

            });
    });

}