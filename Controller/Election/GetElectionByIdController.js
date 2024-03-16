const {getElectionById}=require('../../Model/ElectionData');

async function getElection(req,res){
    const id=req.params.id;
    try {
        const election=await getElectionById(id);
        if(election){
            return res.json(election);
        }
        return  res.sendStatus(404);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getElection;