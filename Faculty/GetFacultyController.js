
const {getAllFaculties}=require('../../Model/FacultyData');

const getFaculties=async(req,res)=>{
    try {
        const faculties=await getAllFaculties();
        return res.json(faculties);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getFaculties;