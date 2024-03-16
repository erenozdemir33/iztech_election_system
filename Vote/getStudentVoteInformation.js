const {studentVoteInformation}=require('../../Model/VoteData');

async function getStudentVoteInformation(req,res){
    const studentId=req.query.studentId;
    const electionId=req.query.electionId;
    try {
        const info=await studentVoteInformation(studentId,electionId);
        if(info[0]){
            return res.json(info[0]);
        }
        return  res.sendStatus(404);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getStudentVoteInformation;