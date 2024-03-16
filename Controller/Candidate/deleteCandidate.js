const{deleteCandidate}=require('../../Model/CandidateData');

const deleteCandidateHandler=async(req,res)=>{
    const id=req.params.id;
    try {
        const candidate=await deleteCandidate(id);
        if(candidate){
            return res.json(candidate);
        }
        return  res.sendStatus(404);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=deleteCandidateHandler;