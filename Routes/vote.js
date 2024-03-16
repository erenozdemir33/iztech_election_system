const express=require('express');

const voteRoute=express.Router();

const submitVote= require('../Controller/Vote/submitVoteController')
const voteInfo= require('../Controller/Vote/getStudentVoteInformation')

/**
 * @swagger
 *
 * /vote/?studentId={studentId}&electionId={electionId}:
 *   get:
 *     tags: 
 *       - "Student"
 *     summary: "Vote information"
 *     description: Vote information
 *     produces:
 *       - application/json
 *     parameters:
 *       - in : query
 *         name: studentId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Student ID
 *       - in : query
 *         name: electionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Election ID
 *     responses:
 *       200:
 *         description: Student gets vote info.
 *       404:
 *         description: Not found
 *      
 *       500:
 *         description: Server error.
 */
voteRoute.get('/',voteInfo);



/**
 * @swagger
 *
 * /vote/submit-vote:
 *   post:
 *     tags: 
 *       - "Student"
 *     summary: "Submit vote"
 *     description: Submit vote
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema: 
 *           type: object
 *           properties:
 *              studentId:
 *                type: integer
 *                example: 1
 *              candidateId:
 *                type: integer
 *                example: 1
 *              electionId:
 *                tye: integer
 *                example: 1
 *     responses:
 *       201:
 *         description: Student submits vote.
 *       400:
 *         description: Missing parameters.
 *      
 *       500:
 *         description: Server error.
 */
voteRoute.post('/submit-vote',submitVote);

module.exports=voteRoute;