const {getAllCandidatesByDepartmentIdAndStatus}=require('../../Model/CandidateData');

async function getCandidatesByDepartmentIdAndStatus(req,res){
    const departmentId=req.query.departmentId;
    const status=req.query.status;
    try {
        const candidates=await getAllCandidatesByDepartmentIdAndStatus(departmentId,status);
        if(candidates){
            return res.json(candidates);
        }
        return  res.sendStatus(404);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getCandidatesByDepartmentIdAndStatus;