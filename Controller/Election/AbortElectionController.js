const{deleteElectionById}=require('../../Model/ElectionData');

const abortElection=async(req,res)=>{
    const id=req.params.id;
    try {
        const election=await deleteElectionById(id);
        console.log(election);
        if(election.length===1){
            return res.json(election);
        }
        return  res.sendStatus(404);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=abortElection;