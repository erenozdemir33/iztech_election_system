const express=require('express');

const getFacultiesHandler=require('../Controller/Faculty/GetFacultyController')
const getFacultyByIdHandler=require('../Controller/Faculty/GetFacultyByIdController')

const facultyRoute=express.Router();

/**
 * @swagger
 *
 * /faculty:
 *   get:
 *     tags:
 *       - "Admin"
 *     summary: "Get all faculties"
 *     description: Admin gets all faculties.
 *     produces:
 *       - application/json
 *    
 *     responses:
 *       200:
 *         description: Get all faculties.
 *       500:
 *         description: Server error
 */
facultyRoute.get('/',getFacultiesHandler);

/**
 * @swagger
 *
 * /faculty/{id}:
 *   get:
 *     tags:
 *       - "Admin"
 *     summary: "Get faculty by id"
 *     description: Admin gets faculty.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in : path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Faculty ID
 *     responses:
 *       200:
 *         description: Get specified faculty.
 *       404:
 *         description: Not found.
 *       500:
 *         description: Server error
 */
facultyRoute.get('/:id',getFacultyByIdHandler);


module.exports=facultyRoute;

