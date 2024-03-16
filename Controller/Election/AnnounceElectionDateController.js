const {createElection}=require('../../Model/ElectionData')
const{getDepartmentById}=require('../../Model/DepartmentData')
const {compareStartEndDates,isValidDate}=require('../../BusinessLogic/ElectionDateStatus')

const announceElectionDateController=async(req,res)=>{
    const {startDate,endDate,departmentId}=req.body;
    if(!startDate||!endDate|| !departmentId) return res.status(400).json({'message':'Missing information'});
    try {
        const isDepartmentExist=(await getDepartmentById(departmentId)).length===0;
        if(!isValidDate(startDate) || !isValidDate(endDate) || !compareStartEndDates(startDate,endDate) || isDepartmentExist){
            return res.status(400).json({'message':'Bad Request'});
        }
        const result=await createElection(startDate,endDate,departmentId);
        if(result) return res.json({"message":"Election has been created"})
    } catch (error) {
        if(error.message==="duplicate key value violates unique constraint \"unique_department_id\""){
            return res.status(400).json({'message':'Departmen already has an election.'});
        }
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=announceElectionDateController;