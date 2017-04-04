
const pgdb = require('../libs/pgdb')();

module.exports = function (router){

    router.post('/main', function(req, res) {
        pgdb.query(`SELECT geojson FROM borders`)
            .then((d)=>{
                res.json({'state' : true , data: d});
            })
            .catch((e)=>{
                console.log("Error" , e);
            })
    });

    router.post('/test' , function (req , res) {
        pgdb.query(`SELECT * FROM geodata WHERE item_type > $1` , [1])
            .then((d)=>{

            })
            .catch((e)=>{

            });
    });

}