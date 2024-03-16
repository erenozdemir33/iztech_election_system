const {sql}=require('../Config/PostgreNeonConfig');

async function getAllCandidatesByDepartmentIdAndStatus(id,status) {
    const result = await sql`SELECT Candidate.id as candidate_id, Candidate.status, Student.name AS candidate_name, Candidate.application_date AS application_date, Student.id as student_id,Department.name as department_name
    FROM Candidate
    JOIN Student ON Candidate.student_id = Student.id
    JOIN Election ON Candidate.election_id = Election.id
    JOIN Department ON Department.id= Student.department_id
    WHERE Candidate.Status = ${status}::text AND Department.id = ${id}::int4;`;
    return result;
};

async function getCandidateByStudentId(student_id){
    const result= await sql`SELECT * from candidate WHERE student_id=${student_id}::int4`;
    return result
}

async function getCandidateCommentByCandidateId(candidate_id){
    const result= await sql`SELECT comment from candidate WHERE id=${candidate_id}::int4`;
    return result
}

async function getCandidatesByDepartmentId(department_id){
    const result= await sql`SELECT Candidate.application_date,Student.name as candidate_name,Department.name as department_name from Candidate
    JOIN Student ON Candidate.student_id = Student.id
    JOIN Department ON Department.id= Student.department_id
    WHERE Department.id=${department_id};
    `;
    return result
}

async function getCandidateInformationByStudentId(student_id){
    const result = await sql`SELECT Candidate.id as candidate_id,Candidate.application_date as application_date, Student.name as candidate_name, Department.name as department_name, Candidate.status as application_status,Candidate.comment as comment 
    FROM Candidate
    JOIN Student ON Candidate.student_id = Student.id
    JOIN Department ON Department.id = Student.department_id
    WHERE Student.id=${student_id}::int4;`;
    return result[0];
}

async function createCandidate(student_id,election_id){
    const result = await sql`INSERT INTO Candidate (student_id,election_id,status) VALUES (${student_id}::int4,${election_id}::int4,'pending') RETURNING *;`;
    return result;
}

async function updateCommentCandidate(candidate_id,comment){
    const result=await sql`UPDATE candidate
    SET comment = ${comment}
    WHERE id =${candidate_id} RETURNING*;`;
    return result;
}

async function deleteCandidate(candidate_id){
    const result=await sql`DELETE FROM  form WHERE candidate_id=${candidate_id}::int4;`
    if(result){
       const result= await sql`DELETE from candidate WHERE id=${candidate_id}  RETURNING*;`;
        return result;
    }
}

async function updateCandidateApplicationDateToCurrent(id){
    const result=await sql`UPDATE candidate
    SET application_date = CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Istanbul'
    WHERE id = ${id}::int4 RETURNING*;`
    return result;
}
async function updateCandidateStatus(id,status){
    const result=await sql`UPDATE candidate
    SET status = ${status}::text
    WHERE id = ${id}::int4 RETURNING*;`
    return result;
}


module.exports={getCandidateCommentByCandidateId,getAllCandidatesByDepartmentIdAndStatus,getCandidatesByDepartmentId,getCandidateByStudentId,createCandidate,getCandidateInformationByStudentId,deleteCandidate,updateCandidateApplicationDateToCurrent,updateCommentCandidate,updateCandidateStatus};
