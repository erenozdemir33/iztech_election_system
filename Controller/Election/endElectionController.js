const{getVoteCountsByDepartmentId}=require('../../Model/VoteData')
const{createElectionResult,deleteOldElectionResultByDepartmentId}=require('../../Model/ElectionResultData')
const{deleteElectionByDepartmentId}=require('../../Model/ElectionData')

const endElection=async(req,res)=>{
    const {departmentId}=req.body;
    if(!departmentId) return res.status(400).json({'message':'Missing information'});
    try {
        const voteCount=await getVoteCountsByDepartmentId(departmentId);
        console.log(voteCount)
        const maxCount=voteCount[0].vote_count;
        const maxCandidates=[]
        voteCount.forEach(element => {
            if(element.vote_count===maxCount){
                maxCandidates.push(element);
            }
        });

        const winner_ids = maxCandidates.map((elem)=>elem.student_id)
        const isDelete=await deleteOldElectionResultByDepartmentId(departmentId);
        if(isDelete){
            const result=await createElectionResult(winner_ids,departmentId,maxCount);
            if(result){
                await deleteElectionByDepartmentId(departmentId);
            }    
        }
        return res.json(maxCandidates)
    } catch (error) {
        if(error.message==="duplicate key value violates unique constraint \"electionresult_election_id_key\""){
            return res.status(400).json({'message':'The election has already been ended'})
        }
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=endElection;