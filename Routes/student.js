const express=require('express');
const studentRoute=express.Router();

const getActiveElectionsDepartment=require('../Controller/Election/GetActiveElectionsByDepartment')
const getInActiveElectionsDepartment=require('../Controller/Election/getInActiveElectionByDepartment')

const getElectionResult=require('../Controller/ElectionResult/getElectionResultByDepartmentId')


/**
 * @swagger
 *
 * /student/active-election-department/{id}:
 *   get:
 *     tags: 
 *       - "Student"
 *     summary: "Get active elections by department id"
 *     description: Get active elections by department id.
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *              minimum: 1
 *            description: Department ID
 *     responses:
 *       200:
 *         description: Get elections.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Server error.
 */
studentRoute.get('/active-election-department/:id',getActiveElectionsDepartment)

/**
 * @swagger
 *
 * /student/inactive-election-department/{id}:
 *   get:
 *     tags: 
 *       - "Student"
 *     summary: "Get inactive election by department id"
 *     description: Get inactive election by department id.
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *              minimum: 1
 *            description: Department ID
 *     responses:
 *       200:
 *         description: Get election.
 *       404:
 *         description: Not found.
 *       500:
 *         description: Server error.
 */
studentRoute.get('/inactive-election-department/:id',getInActiveElectionsDepartment)

/**
 * @swagger
 *
 * /student/election-results/{id}:
 *   get:
 *     tags: 
 *       - "Student"
 *     summary: "Get election results by department id"
 *     description: Get election results by department id.
 *     parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *              minimum: 1
 *            description: Department ID
 *     responses:
 *       200:
 *         description: Get results.
 *       404:
 *         description: Not found.
 *       500:
 *         description: Server error.
 */
studentRoute.get('/election-results/:id',getElectionResult)

module.exports=studentRoute;