
const {getAllDepartments}=require('../../Model/DepartmentData');

const getDepartment=async(req,res)=>{
    try {
        const departments=await getAllDepartments();
        return res.json(departments);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}


module.exports=getDepartment;