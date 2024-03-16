const {getFormsByCandidateId}=require('../../Model/FormData');

async function getCandidateFormsByCandidateIdController(req,res){
    const id=req.params.id;
    try {
        const forms=await getFormsByCandidateId(id);
        if(forms) return res.json(forms);
        return  res.sendStatus(404);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getCandidateFormsByCandidateIdController;