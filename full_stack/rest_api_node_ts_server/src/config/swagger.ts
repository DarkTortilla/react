import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options= {
    swaggerDefinition:{
        openapi: '3.0.0',
        tags:[{
            name:'Products',
            description: 'API operation related to products'
        }],
        info:{
            title:'REST API Node.js / Express / TypeScript',
            version:'1.0.0',
            description:'API Docs for Products'
        }
    },
    apis:['./src/routes/router.ts']
}
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

