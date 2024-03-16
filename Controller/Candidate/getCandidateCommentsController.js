const {getCandidateCommentByCandidateId}=require('../../Model/CandidateData');


async function getCandidateCommentController(req,res){
    const id=req.params.id;
    try {
        const candidate=await getCandidateCommentByCandidateId(id);
        if(candidate){
           
            return res.json(candidate[0]);
        }
        return  res.sendStatus(404);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getCandidateCommentController;