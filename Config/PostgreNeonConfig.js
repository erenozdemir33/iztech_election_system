// Do not expose your Neon credentials to the browser
// .env
const PGHOST='ep-misty-frost-070067.us-east-2.aws.neon.tech'
const PGDATABASE='neondb'
const PGUSER='berkayBayrakk'
const PGPASSWORD='UlC4eXOrvT7z'
const ENDPOINT_ID='ceng316-db'

// app.js
const postgres = require('postgres');

const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`;

const sql = postgres(URL, { ssl: 'require' });

async function isExistDB(){
    const query="SELECT EXISTS ( SELECT 1 FROM information_schema.tables WHERE table_schema = 'public'); "
    const result =await sql`${query}`;
    return result[0].exists;
}

async function createDatabase(){
    await sql`
    DROP TABLE IF EXISTS Student CASCADE; /
    DROP TABLE IF EXISTS Candidate CASCADE;/
    DROP TABLE IF EXISTS Form CASCADE;/
    DROP TABLE IF EXISTS Election CASCADE;/
    DROP TABLE IF EXISTS ElectionResult CASCADE;/
    DROP TABLE IF EXISTS Vote CASCADE;/
    DROP TABLE IF EXISTS Faculty CASCADE;/
    DROP TABLE IF EXISTS Notification CASCADE;/
    DROP TABLE IF EXISTS Department CASCADE;/
    
    
    CREATE TABLE Faculty (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );/
    
   
    CREATE TABLE Department (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        faculty_id INTEGER REFERENCES Faculty(id) NOT NULL
    );/
  
    CREATE TABLE Student (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        department_id INTEGER REFERENCES Department(id),
        role TEXT DEFAULT 'undergraduate',
        tenure DATE
    );/
    
    CREATE TABLE Admin (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'admin',
        
    );/


    CREATE TABLE Candidate (
        id SERIAL PRIMARY KEY,
        correction boolean DEFAULT false,
        status TEXT
    );/
    
 
    CREATE TABLE Form (
        id SERIAL PRIMARY KEY,
        candidate_id INTEGER REFERENCES Candidate(id) NOT NULL,
        type TEXT,
        name TEXT
    );/
    
    CREATE TABLE Election (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        date DATE,
        start_time TIME,
        end_time TIME,
        position TEXT
    );/
    
    CREATE TABLE ElectionResult (
        id SERIAL PRIMARY KEY,
        election_id INTEGER REFERENCES Election(id) NOT NULL,
        winner_student_id INTEGER,
        votes INTEGER
    );/
    
  
    CREATE TABLE Notification (
        id SERIAL PRIMARY KEY,
        receiver_id INTEGER NOT NULL,
        message TEXT NOT NULL
    );/
    
    CREATE TABLE Vote (
        student_id INTEGER REFERENCES Student(id),
        election_id INTEGER REFERENCES Election(id),
        candidate_id INTEGER REFERENCES Candidate(id),
        PRIMARY KEY(Student_id, election_id)
    
    );`
       
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

module.exports={sql,createDatabase};