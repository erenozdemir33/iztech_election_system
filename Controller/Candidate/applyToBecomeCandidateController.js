const {createCandidate}=require('../../Model/CandidateData');
const {getStudentById}=require('../../Model/StudentData');
const {getElectionByDepartmentId}=require('../../Model/ElectionData');
const {createForm}=require('../../Model/FormData');
const {getDepartmentById}=require('../../Model/DepartmentData');


async function applyToBecomeCandidate(req,res){
    const {studentId}=req.body;
    const files = req.files;
    try {
        if(!files) return res.status(400).json({'message':'No file uploaded.'});
        if(files.length!==3) return res.status(400).json({'message':'There should be 3 files.'});
        //check student's department id and election's department id are same
        const fileNames=files.map((file)=>file.originalname)


        const student= await getStudentById(studentId);
        const election= await getElectionByDepartmentId(student.department_id);
        const department = await getDepartmentById(student.department_id);
        console.log(election)

        const candidate= await createCandidate(studentId,election.id);
        files.forEach(async file => {
            await createForm(candidate[0].id,file.buffer,file.originalname,file.mimetype,file.size);
        });
        candidate[0].forms=[
            ...fileNames
        ]
        candidate[0].name=student.name;
        candidate[0].department_name=department[0].department_name;
        return res.json(candidate[0]);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}
module.exports=applyToBecomeCandidate;