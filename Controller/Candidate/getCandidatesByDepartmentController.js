const {getCandidatesByDepartmentId}=require('../../Model/CandidateData');

async function getCandidatesByDepartment(req,res){
    const id=req.params.id;
    try {
        const candidates=await getCandidatesByDepartmentId(id);
        if(candidates){
            return res.json(candidates);
        }
        return  res.sendStatus(404);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getCandidatesByDepartment;