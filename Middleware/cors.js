const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:3000','https://ceng316-prod.vercel.app'], // Set the allowed origin
    methods: 'GET,POST,PUT,DELETE', // Set the allowed HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Set the allowed headers
};

const corsConfig=cors(corsOptions);

module.exports=corsConfig;