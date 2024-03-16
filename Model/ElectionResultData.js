const {sql}=require('../Config/PostgreNeonConfig');

async function getElectionResultByDepartmentId(department_id){
    const result=await sql`SELECT winner_student_id as winners, vote_count from electionresult
    WHERE department_id=${department_id}::int4
    `
    return result;
}

async function createElectionResult(winner_ids,department_id,vote_count){
    const result=await sql`INSERT INTO ElectionResult (winner_student_id,department_id,vote_count) VALUES (${winner_ids}::_int4,${department_id}::int4,${vote_count}::int4)RETURNING*`
    return result;
}

async function deleteOldElectionResultByDepartmentId(department_id){
    const result=await sql`DELETE FROM ElectionResult WHERE department_id=${department_id}::int4`;
    return result;
}

module.exports={createElectionResult,getElectionResultByDepartmentId,deleteOldElectionResultByDepartmentId};