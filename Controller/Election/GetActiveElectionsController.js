const {getAllElectionsActive}=require('../../Model/ElectionData')

const getActiveElections=async(req,res)=>{
    try {
        const activeElections=await getAllElectionsActive();
        return res.json(activeElections);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getActiveElections;