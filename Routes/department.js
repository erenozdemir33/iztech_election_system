const express=require('express');

const getAlldepartmentsHandler=require('../Controller/Department/GetDepartmentController');

const departmentRoute=express.Router();


/**
 * @swagger
 *
 * /department:
 *   get:
 *     tags:
 *       - "Admin"
 *     summary: "Get all departments"
 *     description: Admin gets all departments.
 *     produces:
 *       - application/json
 *    
 *     responses:
 *       200:
 *         description: Get all departments.
 *       500:
 *         description: Server error
 */
departmentRoute.get('/',getAlldepartmentsHandler);

module.exports=departmentRoute;

