const {updateCommentCandidate}=require('../../Model/CandidateData');

async function updateComment(req,res){
    const {candidateId,comment}=req.body;
    if(!candidateId|| !comment) return res.status(400).json({'message':'Missing Informations'})
    try {
       
       const candidate=await updateCommentCandidate(candidateId, comment);
      
       return res.status(201).json(candidate[0]);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=updateComment;