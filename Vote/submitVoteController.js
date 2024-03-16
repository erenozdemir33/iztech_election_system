
const {createVote}=require('../../Model/VoteData')

async function submitVote(req,res){
    const{studentId,candidateId,electionId}=req.body;
    if(!studentId || !candidateId || !electionId ) return res.status(400).json({'message':'Missing Information'});
    
    try {
        const vote=await createVote(studentId,candidateId,electionId);

        res.status(201).json(vote[0]);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=submitVote;