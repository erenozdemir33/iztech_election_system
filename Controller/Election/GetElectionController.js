const {getAllElections}=require('../../Model/ElectionData')

const getElections=async(req,res)=>{
    try {
        const elections=await getAllElections();
        return res.json(elections);
    } catch (error) {
        res.status(500).json({"message":`${error}`});
    }
}

module.exports=getElections;