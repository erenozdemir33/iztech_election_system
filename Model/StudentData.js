const {sql}=require('../Config/PostgreNeonConfig');

async function getStudentById(id){
    const result=await sql`SELECT * from Student WHERE id=${id}::int4;`;
    return result[0];
}

async function getStudentByEmail(email){
    const result=await sql`SELECT * from Student WHERE email=${email}::text`
    return result[0];
};

async function getStudentsByIds(student_ids){
    const result = await sql`SELECT name,id,email from Student WHERE id= ANY (${student_ids}::int[])`
    return result;
}

async function updateStudentRoleByStudentId(role, id) {
    const result= await sql`UPDATE Student SET role = ${role}::text WHERE id=${id}::int4`;
    return result;
}


module.exports={getStudentByEmail,updateStudentRoleByStudentId,getStudentById,getStudentsByIds};
