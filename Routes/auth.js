const {loginHandler}=require('../Controller/Student/LoginController');
const express=require('express');

const authRoute=express.Router();
/**
 * @swagger
 *
 * /auth/login:
 *   post:
 *     tags: 
 *       - "User"
 *     summary: "Log In to IOES"
 *     description: User logs in IOES
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema: 
 *           type: object
 *           properties:
 *              email:
 *                type: string
 *                example: example@gmail.com
 *              password:
 *                type: string
 *                example: password
 *     responses:
 *       200:
 *         description: User has been logged in.
 *       400:
 *         description: Missing parameters.
 *       401:
 *         description: Wrong password.
 *       500:
 *         description: Server error.
 */
authRoute.post('/login',loginHandler);


module.exports=authRoute;