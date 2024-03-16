const {getCandidateInformationByStudentId}=require('../../Model/CandidateData');


async function getCandidateInformationByStudentIdController(req,res){
    const id=req.params.id;
    try {
        const candidate=await getCandidateInformationByStudentId(id);
        if(candidate){
           
            return res.json(candidate);
        }
        return  res.sendStatus(404);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getCandidateInformationByStudentIdController;