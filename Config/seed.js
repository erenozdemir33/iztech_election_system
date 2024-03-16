
const bcrypt=require('bcrypt');
const {sql}=require('./PostgreNeonConfig');

async function createFacultyInstances(){
    await sql`INSERT INTO faculty (name) VALUES ('Faculty 1');`;
    await sql`INSERT INTO faculty (name) VALUES ('Faculty 2');`;

}

async function createDeaprtmentInstances(){
    await sql`INSERT INTO Department (name,faculty_id) VALUES ('Department 1',1);`;
   // await sql`INSERT INTO Department (name,faculty_id) VALUES ('Department 2',1);`;
    //await sql`INSERT INTO Department (name,faculty_id) VALUES ('Department 3',2);`;
}

//berkay123
//enis123
//enes123
async function createStudentInstances(){
    const cryptedPassword=await bcrypt.hash("test123",10);
    //INSTERT INTO Election (start_time,end_time,department_id) VALUES (2024-01-01,2025-01-01,10)
    await sql`INSERT INTO Student (name,password,email,department_id,role) VALUES ('student',${cryptedPassword}::text,'student11@std.iyte.edu.tr',11,'student');`;
    //await sql`INSERT INTO Student (name,password,email,department_id) VALUES ('Student 2','${cryptedPassword}','student2@gmail.com',1);`;
    //await sql`INSERT INTO Student (name,password,email,department_id) VALUES ('Student 3','${cryptedPassword}','student3@gmail.com',2);`;
}

module.exports={createFacultyInstances,createDeaprtmentInstances,createStudentInstances};