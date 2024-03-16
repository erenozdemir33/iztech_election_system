const {getFacultyById}=require('../../Model/FacultyData');

async function getFaculty(req,res){
    const id=req.params.id;
    try {
        const faculty=await getFacultyById(id);
        if(faculty){
            return res.json(faculty);
        }
        return  res.sendStatus(404);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getFaculty;