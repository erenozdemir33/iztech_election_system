const {getAllElectionsFinished}=require('../../Model/ElectionData')

const getFinishedElections=async(req,res)=>{
    try {
        const finishedElections=await getAllElectionsFinished();
        return res.json(finishedElections);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getFinishedElections;