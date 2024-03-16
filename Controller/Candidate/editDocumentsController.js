const {deleteFormsByCandidateId,createForm}=require('../../Model/FormData');
const {getCandidateByStudentId,updateCandidateApplicationDateToCurrent,updateCandidateStatus}=require('../../Model/CandidateData');

async function editDocuments(req,res){
    const {studentId}=req.body;
    const files = req.files;
    try {
       
        if(!files) return res.status(400).json({'message':'No file uploaded.'});
        if(files.length!==3) return res.status(400).json({'message':'There should be 3 files.'});
        const candidate=await getCandidateByStudentId(studentId);
        const isDeleted=await deleteFormsByCandidateId(candidate[0].id);
        if(isDeleted){
        files.forEach(async file => {
            await createForm(candidate[0].id,file.buffer,file.originalname,file.mimetype,file.size);
        });
       }
       await updateCandidateStatus(candidate[0].id,'pending');
       const result=await updateCandidateApplicationDateToCurrent(candidate[0].id);

       return res.status(201).json(result[0]);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=editDocuments;