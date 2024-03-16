const {sql}=require('../Config/PostgreNeonConfig');

async function getFormIdAndCandidateNameByCandidateId(id) {
    const result = await sql `SELECT Form.id , Student.name as candidate_name
    FROM Form
    JOIN Candidate ON Form.candidate_id = Candidate.id
    JOIN Student ON Candidate.student_id = Student.id
    WHERE Candidate.id = ${id}::int4;`;
    return result;
}

async function getAllForms() {
    const result = await sql `SELECT * FROM Form`;
    return result;
}

async function getFormsByCandidateId(candidate_id){
    const result = await sql `SELECT Form.id as id,file_data,Form.file_name as file_name FROM Form
    JOIN Candidate ON FORM.candidate_id=Candidate.id
    WHERE Candidate.id = ${candidate_id}::int4;
    `;
    return result;
}

async function getAllPendingForms() {
    const result = await sql`SELECT Form.id, Form.type, Form.name
    FROM Form
    JOIN Candidate ON Form.candidate_id = Candidate.id
    WHERE Candidate.status = 'pending';
    `;
    return result;
}

async function createForm(candidate_id,file_data,file_name,mime_type,file_size){
    const result= await sql`INSERT INTO form (candidate_id,file_data,file_name,mime_type,file_size) VALUES (${candidate_id}::int4,${file_data}::bytea,${file_name}::text,${mime_type}::text,${file_size}::int4 )  RETURNING *;`
    return result;
}

async function deleteFormsByCandidateId(candidate_id){
    const result = await sql`DELETE FROM Form WHERE candidate_id=${candidate_id}::int4`;
    return result;
}

module.exports={getFormIdAndCandidateNameByCandidateId,getAllForms,getAllPendingForms,createForm,getFormsByCandidateId,deleteFormsByCandidateId};