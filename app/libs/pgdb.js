const pg    = require('pg'),
    when    = require('when'),
    config  = require('../../config');
let pgdbsc = null;

module.exports = function(db){


    if( typeof(config)=='undefined' || typeof(config.db)=='undefined' ){
        throw new Error('Expected validation config');
    }

    return new pgdb(db);
};

function pgdb(){
    if(pgdbsc == null){
        pgdbsc = new pg.Pool(config.db);
        // this.pgpool = pgdbsc;
    }
};

pgdb.prototype.query = function(sql , data){
    var deferred = when.defer();
    pgdbsc.connect(function(err, client, done) {
        if(err) {
            return deferred.reject(err);
        }
        if(typeof data != 'undefined' && data.length > 0){
            client.query(sql, data, function(err, result) {
                //call `done()` to release the client back to the pool
                done();

                if(err) {
                    return deferred.reject(err);
                }
                deferred.resolve( result.rows );
            });
        }else{
            client.query(sql, function(err, result) {
                //call `done()` to release the client back to the pool
                done();

                if(err) {
                    return deferred.reject(err);
                }
                deferred.resolve( result.rows );
                //output: 1
            });
        }
    })

    // TODO Den
    //
    pgdbsc.on('error', function (err, client) {
        console.error('idle client error', err.message, err.stack)
    });

    // pgdbsc.on('connect', (client) => {
    //     // client.count = count++;
    //     console.log("Client poll connected >> ");
    // });

    return deferred.promise;

}