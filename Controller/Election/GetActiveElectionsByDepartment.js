const {getAllElectionsActiveByDepartmentId}=require('../../Model/ElectionData')

const getActiveElectionsDepartment=async(req,res)=>{
    const id=req.params.id;
    try {
        const activeElections=await getAllElectionsActiveByDepartmentId(id);
        return res.json(activeElections);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getActiveElectionsDepartment;