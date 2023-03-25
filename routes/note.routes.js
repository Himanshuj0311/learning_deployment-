const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/note.model")
const jwt=require("jsonwebtoken")

noteRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
            const notes=await NoteModel.find({"userID":decoded.userID})
            res.status(200).send(notes)
        }
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

noteRouter.post("/add",async(req,res)=>{
    try{
        const note=new NoteModel(req.body)
        await note.save()
        res.status(200).send({"msg":"A new Note has been added"}) 
    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

noteRouter.patch("/update/:noteID",async(req,res)=>{
    //write the patch logic by your own
    const { userID } = req.params
    const payload = req.body
    try {
      const query = await NoteModel.findByIdAndUpdate({ _id: userID }, payload)
      res.status(200).send({"mss":"the note updete"})
    } catch (err) {
      console.log(err)
      res.send({ "err": "something went wrong" })
    }
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
    //write the delete logic by your own
    const userID = req.params.userID
    try {
      await NoteModel.findByIdAndDelete({ _id: userID })
      res.send(`Note with  id ${userID} has been deleted from the database`)
    } catch (err) {
      console.log(err)
      res.send({ "err": "something went wrong" })
    }
})

module.exports={
    noteRouter
}


