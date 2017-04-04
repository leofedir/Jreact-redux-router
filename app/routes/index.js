const router = require('express').Router(),
      bodyParser = require('body-parser'),
      // pgdb = require('../libs/pgdb')(),
      demografiya = require('./demografiya');

// const pg = require('pg');
//
// const config = {
//     user: 'postgres',
//     database: 'enter',
//     password: 'CecgskmytJrj1600',
//     host: '89.184.82.170',
//     port: 5432,
//     max: 10,
//     idleTimeoutMillis: 30000,
// };

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: true
}));


demografiya(router);

// router.post('/main', function(req, res) {
//
//     pgdb.query(`SELECT geojson FROM borders`)
//         .then((d)=>{
//             res.json({'state' : true , data: d});
//         })
//         .catch((e)=>{
//             console.log("Error" , e);
//         })
//
//     // const pool = new pg.Pool(config);
//     //
//     // pool.connect(function(err, client, done) {
//     //     if(err) {
//     //         return console.error('error fetching client from pool', err);
//     //     }
//     //     client.query(`SELECT geojson
//     //                   FROM borders`, function(err, result) {
//     //             done(err);
//     //             if(err) {
//     //                 return console.error('error running query', err);
//     //             }
//     //             res.json({'state' : true , data: result.rows});
//     //         });
//     //
//     // });
//     //
//     // pool.on('error', function (err, client) {
//     //     console.error('idle client error', err.message, err.stack)
//     // })
// });

module.exports = router;