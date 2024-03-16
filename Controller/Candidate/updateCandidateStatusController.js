const {updateCandidateStatus}=require('../../Model/CandidateData');

async function updateComment(req,res){
    const {candidateId,status}=req.body;
    console.log(status!=='rejected' && status!=='approved')
    if(!candidateId|| !status) return res.status(400).json({'message':'Missing Informations'})
    if(status!=='rejected' && status!=='approved')return res.status(400).json({'message':'Bad request'})
    try {
       
       const candidate=await updateCandidateStatus(candidateId, status);
      
       return res.status(201).json(candidate[0]);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=updateComment;