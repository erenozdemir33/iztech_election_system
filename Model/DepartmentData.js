const {sql}=require('../Config/PostgreNeonConfig');

async function getDepartmentById(id){
    const result=await sql`SELECT d.id as id,d.name as department_name, f.name as faculty_name, f.id as faculty_id from Department as d CROSS JOIN Faculty as f WHERE f.id=d.faculty_id AND d.id=${id}::int4`;
    return result;
}

async function getAllDepartments(){
    const result=await sql`SELECT d.id as id,d.name as department_name, f.name as faculty_name, f.id as faculty_id from Department as d CROSS JOIN Faculty as f WHERE f.id=d.faculty_id`;
    return result;
}

module.exports={getAllDepartments,getDepartmentById};