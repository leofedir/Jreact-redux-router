module.exports = {
    server : {
        port : 8000
    },
    db:{
        user: 'postgres',
        database: 'enter',
        password: 'd12e143n972',
        host: '89.184.82.32',
        port: 5432,
        max: 20, //set pool max size to 20
        min: 10, //set min pool size to 4
        idleTimeoutMillis: 30000 ,
        application_name: 'gisportal'
    }
};
