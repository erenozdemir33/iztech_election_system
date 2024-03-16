const {getAllElectionsInActiveByDepartmentId}=require('../../Model/ElectionData');

async function getElectionByDepartment(req,res){
    const id=req.params.id;
    try {
        const election=await getAllElectionsInActiveByDepartmentId(id);

        if(election[0]){
            return res.json(election[0]);
        }
        return  res.sendStatus(404).json({'message':'Not Found'});
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getElectionByDepartment;