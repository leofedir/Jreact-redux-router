module.exports = {
    server : {
        port : 8000
    },
    db:{
        user: 'postgres',
        database: 'enter',
        password: 'adCf2il43mPlkg0s1',
        host: '89.184.82.32',
        port: 5432,
        max: 20, //set pool max size to 20
        min: 10, //set min pool size to 4
        idleTimeoutMillis: 30000 ,
        application_name: 'gisportal'
    }
};
