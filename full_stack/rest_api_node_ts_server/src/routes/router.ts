import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "../handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares";
const router = Router();
/**
 * @swagger
 * components:
 *    schemas:
 *        Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The Product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The Product name
 *                  example: Firus
 *              price:
 *                  type: integer
 *                  description: The Product price
 *                  example: 5
 *              availability:
 *                  type: boolean
 *                  description: The Product availability
 *                  example: true
 *  
 */




/**
 * @swagger
 * /api/products:
 *    get: 
 *      summary: Get a list of products
 *      tags:
 *          - Products
 *      description: Return a list of products
 *      responses: 
 *              200:
 *                  description: Successful response
 *                  content:
 *                       application/json:
 *                           schema:
 *                                type: array
 *                                items:
 *                                    $ref: '#/components/schemas/Product'   
 *              
 * 
 */
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *    summary: Get a product by ID
 *    tags:
 *      - Products
 *    description: Return a product based on its unique ID
 *    parameters:
 *      - in: path
 *        name: id
 *        description: The ID of the product to retrieve
 *        required: true
 *        schema:
 *         type: integer
 * 
 *    responses: 
 *      200:
 *         description: Successful Response
 *         content:
 *            application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Product'  
 *      404: 
 *        description: Not found
 *      400:
 *        description: Bad Request - Invalid ID
 */

router.get('/:id', 
  param('id').isInt().withMessage('Que demonios te pasa pervertido?, no sabes leer?'),
  handleInputErrors,
  getProductById);

/**
 * @swagger
 * /api/products:
 *  post:
 *    summary: Creates a new product
 *    tags: 
 *      - Products
 *    description: Returns a new record in the database
 *    requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                      name: 
 *                         type: string
 *                         example: firus
 *                      price: 
 *                         type: integer
 *                         example: 5    
 *    responses: 
 *      400:
 *        description: Bad request invalid input data
 *      201: 
 *        description: Product created successfully
 */

router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede estar vacio"),
  body("price")
    .notEmpty()
    .withMessage("El precio del producto no puede estar vacio")
    .isNumeric()
    .withMessage("Valor no válido")
    .custom((value) => value > 0)
    .withMessage("Valor no válido"),
  handleInputErrors,
  createProduct 
);

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Updates a product with user input
 *     tags: 
 *       - Products
 *     description: Returns the updated product
 *     parameters: 
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema: 
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *                 example: firus
 *               price: 
 *                 type: integer
 *                 example: 5
 *               availability:
 *                 type: boolean
 *                 example: true
 *     responses: 
 *       200:
 *         description: Successful response
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400: 
 *         description: Bad Request - Invalid ID or Invalid data
 *       404: 
 *         description: Product Not Found
 */


router.put('/:id', 
  body("name")
    .notEmpty()
    .withMessage("El nombre del producto no puede estar vacio"),
  body("price")
    .notEmpty()
    .withMessage("El precio del producto no puede estar vacio")
    .isNumeric()
    .withMessage("Valor no válido")
    .custom((value) => value > 0)
    .withMessage("Valor no válido"),
  body('availability').isBoolean().withMessage("el campo debe ser como boolean"),
  param('id').isInt().withMessage('Que demonios te pasa pervertido?, no sabes leer?'),
  handleInputErrors,
  updateProduct,
)

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *    summary: Update a product availability
 *    tags: 
 *       - Products
 *    parameters: 
 *       - in: path
 *         name: id
 *         description: The ID of the product to retrieve
 *         required: true
 *         schema: 
 *           type: integer
 *    responses: 
 *       200:
 *         description: Successful response
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400: 
 *         description: Bad Request - Invalid ID or Invalid data
 *       404: 
 *         description: Product Not Found
 * 
 */

router.patch('/:id', 
  // body('availability').isBoolean().withMessage("el campo debe ser como boolean"),
  param('id').isInt().withMessage('Que demonios te pasa pervertido?, no sabes leer?'),
  handleInputErrors,
  updateAvailability)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    summary: delete a product as she deleted me of her life
 *    tags: 
 *       - Products
 *    parameters: 
 *       - in: path
 *         name: id
 *         description: The ID of the product to delete
 *         required: true
 *         schema: 
 *           type: integer
 *    responses: 
 *       200:
 *         description: Successful response
 *       400: 
 *         description: Bad Request - Invalid ID or Invalid data
 *       404: 
 *         description: Product Not Found
 * 
 */

router.delete('/:id', param('id').isInt().withMessage('Que demonios te pasa pervertido?, no sabes leer?'), handleInputErrors,deleteProduct)

export default router;
