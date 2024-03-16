const express=require('express');
const candidateRoute=express.Router();

const getCandidatesByElectionId=require('../Controller/Candidate/getCandidatesByElectionIdAndStatusController');
const applyToBecomdeCandidate=require('../Controller/Candidate/applyToBecomeCandidateController');
const getCandidateInformation=require('../Controller/Candidate/getCandidateInformationsByStudentIdController');
const editDocuments=require('../Controller/Candidate/editDocumentsController');
const deleteCandidate=require('../Controller/Candidate/deleteCandidate');
const updateCandidateComment=require('../Controller/Candidate/updateCandidateCommentController');
const updateCandidateStatus=require('../Controller/Candidate/updateCandidateStatusController');

const getCandidateForms=require('../Controller/Candidate/getCandidateFormsController');
const getCandidateByDepartment=require('../Controller/Candidate/getCandidatesByDepartmentController');
const getCandidateComment=require('../Controller/Candidate/getCandidateCommentsController');

const multer=require('multer');
// Multer configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 *
 * /candidate/?departmentId={departmentId}&status={status}:
 *   get:
 *     tags:
 *       - "Admin"
 *     summary: "Get candidates by department id and status"
 *     description: Admin gets candidates by department id and status.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in : query
 *         name: departmentId
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Department ID
 *       - in : query
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *         description: Status
 *     responses:
 *       200:
 *         description: Get candidates.
 *       404:
 *         description: Not found.
 *       500:
 *         description: Server error
 */
candidateRoute.get('/', getCandidatesByElectionId);


/**
 * @swagger
 *
 * /candidate/comment/{id}:
 *   get:
 *     tags:
 *       - "Admin"
 *     summary: "Get candidate comment by candidate id"
 *     description: Get candidate comment by candidate id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in : path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Candidate ID
 *     responses:
 *       200:
 *         description: Get candidate comment.
 *       404:
 *         description: Not found.
 *       500:
 *         description: Server error
 */
candidateRoute.get('/comment/:id',getCandidateComment)

/**
 * @swagger
 *
 * /candidate/{id}:
 *   get:
 *     tags:
 *       - "Admin"
 *     summary: "Get candidates  by department id"
 *     description: Get candidates by department id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in : path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Department ID
 *     responses:
 *       200:
 *         description: Get candidates.
 *       404:
 *         description: Not found.
 *       500:
 *         description: Server error
 */
candidateRoute.get('/:id',getCandidateByDepartment)

/**
 * @swagger
 *
 * /candidate/apply-become-candidate:
 *   post:
 *     tags: 
 *       - "Candidate"
 *     summary: "Apply to become candidate"
 *     description: Student applies to become candidate.
 *     parameters:
 *          - in: formData
 *            type: array
 *            items:
 *              type: file
 *          - in: body
 *            name: id
 *            required: true
 *            schema:
 *              type: integer
 *              minimum: 1
 *            description: Student ID
 *               
 *     responses:
 *       201:
 *         description: Candidate created.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Server error.
 */
candidateRoute.post('/apply-become-candidate',upload.array('pdf'),applyToBecomdeCandidate);

/**
 * @swagger
 *
 * /candidate/update-status:
 *   put: 
 *     tags:
 *       - "Admin"
 *     summary: "Edit candidate status by candidate id"
 *     description: Edit candidate status by candidate id status should be approved or rejected.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema: 
 *           type: object
 *           properties:
 *              candidateId:
 *                type: integer
 *                example: 1
 *              status:
 *                type: string
 *                example: comment
 * 
 *     responses:
 *       201:
 *         description: Edit candidate status.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Server error
 */
candidateRoute.put('/update-status',updateCandidateStatus);


/**
 * @swagger
 *
 * /candidate/submit-comment:
 *   post: 
 *     tags:
 *       - "Admin"
 *     summary: "Edit candidate comment by candidate id"
 *     description: Edit candidate comment by candidate id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema: 
 *           type: object
 *           properties:
 *              candidateId:
 *                type: integer
 *                example: 1
 *              comment:
 *                type: string
 *                example: comment
 * 
 *     responses:
 *       201:
 *         description: Edit candidate documents.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Server error
 */
candidateRoute.post('/submit-comment',updateCandidateComment);

/**
 * @swagger
 *
 * /candidate/candidate-information/{id}:
 *   get:
 *     tags:
 *       - "Candidate"
 *     summary: "Get candidate documents by student id"
 *     description: Get candidate documents by student id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in : path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Get candidate info.
 *       404:
 *         description: Not found.
 *       500:
 *         description: Server error
 */
candidateRoute.get('/candidate-information/:id',getCandidateInformation);

/**
 * @swagger
 *
 * /candidate/candidate-forms/{id}:
 *   get:
 *     tags:
 *       - "Admin"
 *     summary: "Get candidate forms by candidate id"
 *     description: Get candidate forms by candidate id.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in : path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Candidate ID
 *     responses:
 *       200:
 *         description: Get candidate forms.
 *       404:
 *         description: Not found.
 *       500:
 *         description: Server error
 */
candidateRoute.get('/candidate-forms/:id',getCandidateForms)


/**
 * @swagger
 *
 * /candidate/edit-documents:
 *   put: 
 *     tags:
 *       - "Candidate"
 *     summary: "Edit candidate documents by student id"
 *     description: Edit candidate documents by student id.
 *     produces:
 *       - application/json
 *     parameters:
 *      parameters:
 *          - in: formData
 *            type: array
 *            items:
 *              type: file
 *          - in : body
 *            name: id
 *            required: true
 *            schema:
 *               type: integer
 *               minimum: 1
 *               description: Student ID
 *     responses:
 *       201:
 *         description: Edit candidate documents.
 *       400:
 *         description: Bad request.
 *       500:
 *         description: Server error
 */
candidateRoute.put('/edit-documents',upload.array('pdf'),editDocuments);


/**
 * @swagger
 *
 * /candidate/{id}:
 *   delete:
 *     tags:
 *       - "Admin"
 *     summary: "Delete candidate by id"
 *     description: Admin deletes candidate.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in : path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Candidate ID
 *     responses:
 *       204:
 *         description: Delete specified candidate.
 *       404:
 *         description: Not found.
 *       500:
 *         description: Server error
 */
candidateRoute.delete('/:id',deleteCandidate);


module.exports=candidateRoute;
