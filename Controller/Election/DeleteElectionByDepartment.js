const{deleteElectionByDepartmentId}=require('../../Model/ElectionData');

const deleteElectionByDepartment=async(req,res)=>{
    const id=req.params.id;
    try {
        const election=await deleteElectionByDepartmentId(id);
        if(election){
            return res.json(election[0]);
        }
        return  res.sendStatus(404);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=deleteElectionByDepartment;