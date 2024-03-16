// NOT USE THIS CONFIG !!!

const {Client}=require('pg');
const client= new Client({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    port:process.env.DB_PORT,
    database:process.env.DB_NAME,
    password:process.env.DB_PASSWORD,
    connectionTimeoutMillis: 5000
    
});

async function isExistDB(){
    const query="SELECT EXISTS ( SELECT 1 FROM information_schema.tables WHERE table_schema = 'public'); "
    let value;
    return await client.query(query).then((res)=> {
        return res.rows[0].exists;
    }).catch(err=>{
        return err
    });
}

async function createTables(){
    const query="\
DROP TABLE IF EXISTS Student CASCADE; \n\
DROP TABLE IF EXISTS Candidate CASCADE;\n\
DROP TABLE IF EXISTS Form CASCADE;\n\
DROP TABLE IF EXISTS Election CASCADE;\n\
DROP TABLE IF EXISTS ElectionResult CASCADE;\n\
DROP TABLE IF EXISTS Vote CASCADE;\n\
DROP TABLE IF EXISTS Faculty CASCADE;\n\
DROP TABLE IF EXISTS Notification CASCADE;\n\
DROP TABLE IF EXISTS Department CASCADE;\n\
\
\
CREATE TABLE Faculty (\n\
    id SERIAL PRIMARY KEY,\n\
    name TEXT NOT NULL\n\
);\n\
\
\
CREATE TABLE Department (\n\
    id SERIAL PRIMARY KEY,\n\
    name TEXT NOT NULL,\n\
    faculty_id INTEGER REFERENCES Faculty(id) NOT NULL\n\
);\n\
\n\
CREATE TABLE Student (\n\
    id SERIAL PRIMARY KEY,\n\
    name TEXT NOT NULL,\n\
    password VARCHAR(20) NOT NULL,\n\
    tcnumber VARCHAR(15),\n\
    email TEXT,\n\
    department_id INTEGER REFERENCES Department(id),\n\
    role TEXT DEFAULT 'undergraduate',\n\
    tenure DATE\n\
);\n\
\
\
CREATE TABLE Candidate (\n\
    id SERIAL PRIMARY KEY,\n\
    correction boolean DEFAULT false,\n\
    status TEXT\n\
);\n\
\
\
CREATE TABLE Form (\n\
    id SERIAL PRIMARY KEY,\n\
    candidate_id INTEGER REFERENCES Candidate(id) NOT NULL,\n\
    type TEXT,\n\
    name TEXT\n\
);\n\
\
\
CREATE TABLE Election (\n\
    id SERIAL PRIMARY KEY,\n\
    name TEXT NOT NULL,\n\
    start_time TIME,\n\
    end_time TIME,\n\
    position TEXT\n\
);\n\
\
\
CREATE TABLE ElectionResult (\n\
    id SERIAL PRIMARY KEY,\n\
    election_id INTEGER REFERENCES Election(id) NOT NULL,\n\
    winner_student_id INTEGER,\n\
    votes INTEGER\n\
);\n\
\
\
CREATE TABLE Notification (\n\
    id SERIAL PRIMARY KEY,\n\
    receiver_id INTEGER NOT NULL,\n\
    message TEXT NOT NULL\n\
);\n\
\
\
CREATE TABLE Vote (\n\
	student_id INTEGER REFERENCES Student(id),\n\
	election_id INTEGER REFERENCES Election(id),\n\
	PRIMARY KEY(Student_id, election_id)\n\
);\n\
\
    "

    const  isExist=await isExistDB();

    if(!isExist){
        client.query(query,(err,res)=>{
            if(err){
                console.log(err);
                console.log(12)
            }
            console.log("Tables are created");
        })
    }
}

//client.connect();
module.exports={client,isExistDB,createTables};
