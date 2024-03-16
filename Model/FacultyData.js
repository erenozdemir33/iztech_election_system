const {sql}=require('../Config/PostgreNeonConfig');

async function getAllFaculties(){
    const result=await sql`SELECT * from faculty`
    return result;
}

async function getFacultyById(id){
    const result=await sql`SELECT  * from Faculty WHERE id=${id}::int4`
    return result[0];
}


module.exports={getAllFaculties,getFacultyById};