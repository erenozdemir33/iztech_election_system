const {sql}=require('../Config/PostgreNeonConfig');

async function isStudentVoted(studentId, electionId) {
    const result = await sql`SELECT 1 FROM Vote WHERE student_id = ${studentId}::int4 AND election_id = ${electionId}::int4`;
    return result;
};

async function studentVoteInformation(student_id,election_id){
   const result= await sql`SELECT * from Vote WHERE Vote.student_id=${student_id}::int4 AND Vote.election_id=${election_id}::int4`;
    return result;
}

async function getVoteCountsByDepartmentId(department_id){
    const result=await sql`SELECT Student.id as student_id, COUNT(*) AS vote_count, Vote.election_id,Student.name
    FROM Vote
    JOIN Candidate ON Candidate.id=Vote.candidate_id
    JOIN Student ON Student.id=Candidate.student_id
    JOIN Election ON Election.department_id=${department_id}::int4
    JOIN Department ON Department.id=Student.department_id
    WHERE Vote.election_id=Election.id
    GROUP BY Student.id,Vote.election_id,Student.name
    ORDER BY vote_count DESC;`
    return result;
}

// Get all students voted to specific election.
async function getAllVotesByElectionId(electionId) {
    const result = await sql`SELECT Student_id, Candidate_id FROM Vote WHERE election_id = ${electionId}::int4`;
    return result;
};

// Get all elections that student voted.
async function getAllElectionsByStudentId(studentId) {
    const result = await sql`SELECT election_id FROM Vote WHERE student_id = ${studentId}::int4`;
    return result;
};

async function createVote(student_id,candidate_id,election_id){
    const result = await sql`INSERT INTO Vote (candidate_id,election_id,student_id) VALUES (${candidate_id}::int4, ${election_id}::int4,${student_id}::int4) RETURNING*`;
    return result;
}


module.exports={isStudentVoted, studentVoteInformation,getVoteCountsByDepartmentId, getAllVotesByElectionId, getAllElectionsByStudentId,createVote};