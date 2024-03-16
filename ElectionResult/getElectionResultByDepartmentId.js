const {getElectionResultByDepartmentId}=require('../../Model/ElectionResultData')
const {getStudentsByIds}=require('../../Model/StudentData')

const getActiveElectionsDepartment=async(req,res)=>{
    const id=req.params.id;
    try {
        
        const result=await getElectionResultByDepartmentId(id);
        if(result.length===0) return res.status(404).json({'message':'Election result is not found'})
        const students=await getStudentsByIds(result[0].winners);
        return res.json(students);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getActiveElectionsDepartment;