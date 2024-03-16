const {sql}=require('../Config/PostgreNeonConfig');

async function getAllElections() {
    const result = await sql`SELECT * FROM Election`;
    return result;
};

async function getElectionById(id) {
    const result = await sql`SELECT * FROM Election WHERE id=${id}::int4`;
    return result[0];
};

async function getElectionByDepartmentId(department_id){
    const result = await sql`SELECT * FROM Election WHERE department_id=${department_id}::int4`;
    return result[0];
}

async function getAllElectionsActiveByDepartmentId(department_id){
    const result = await sql`SELECT * FROM Election WHERE start_time <= CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Istanbul' AND end_time > CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Istanbul' AND department_id=${department_id}::int4`;
    return result;
}

async function getAllElectionsInActiveByDepartmentId(department_id){
    const result = await sql`SELECT * FROM Election WHERE start_time > CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Istanbul' AND department_id=${department_id}::int4`;
    return result;
};

async function getAllElectionsActive() {
    const result = await sql`
    SELECT * FROM Election WHERE start_time <= CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Istanbul' AND end_time > CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Istanbul'`;
    return result;
};

async function getAllElectionsNotStarted() {
    const result = await sql`SELECT * FROM Election WHERE start_time > CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Istanbul'`;
    return result;
};

async function getAllElectionsFinished() {
    const result = await sql`SELECT * FROM Election WHERE end_time <= CURRENT_TIMESTAMP AT TIME ZONE 'Europe/Istanbul'`;
    return result;
};

async function createElection(start_date,end_date,department_id){
    const result = await sql`INSERT INTO Election (department_id,start_time,end_time,round) VALUES (${department_id}::int4,${start_date}::date,${end_date}::date,1)`;
    return result;
};

async function deleteElectionById(id){
    const result=await sql`DELETE FROM Election Where id=${id}::int4 RETURNING *`;
    return result;
};

async function deleteElectionById(id){
    const result=await sql`DELETE FROM Election Where id=${id}::int4 RETURNING *`;
    return result;
};

async function deleteElectionByDepartmentId(department_id){
    const result=await sql`DELETE FROM Election Where department_id=${department_id}::int4 RETURNING *`;
    return result;
}
 
async function updateElectionStartAndEndTimeByDepartmentId(department_id,start_date,end_date){
    const result=await sql`UPDATE election
    SET start_time = ${start_date},
    end_time = ${end_date}
    WHERE department_id = ${department_id}::int4 RETURNING*;`
    return result;
}

module.exports={getAllElections,getElectionByDepartmentId,getAllElectionsInActiveByDepartmentId,getAllElectionsActiveByDepartmentId, getElectionById,getAllElectionsNotStarted,getAllElectionsActive,getAllElectionsFinished,createElection,deleteElectionById,deleteElectionByDepartmentId,updateElectionStartAndEndTimeByDepartmentId}; 
