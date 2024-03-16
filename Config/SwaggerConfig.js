const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    swaggerDefinition: {
        // Like the one described here: https://swagger.io/specification/#infoObject

        info: {
          title: 'IOES',
          version: '1.0.0',
          description: 'API documentation for IZTECH ONLINE ELECTION SYSTEM',
          contact: {
            name: 'Berkay Bayrak',
            email: 'berkaybayrak296@gmail.com',
          },
        },
        basePath: '/',
      },
      // List of files to be processes. You can also set globs './routes/*.js'
        apis: ['./Routes/*.js']

};

const specs = swaggerJsdoc(options);

module.exports=specs;

