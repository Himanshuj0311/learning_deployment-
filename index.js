const express=require("express")
const {connection}=require("./db")
const {userRouter}=require("./routes/user.Routes")
const {noteRouter}=require("./routes/note.routes")
 const {auth}=require("./middelwares/auth.middlewares")
 const cors=require("cors")
 require("dotenv").config()
const app=express()
app.use(express.json())
 app.use(cors())

app.use("/users",userRouter)
app.use(auth)
app.use("/notes",noteRouter)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("Connected to the DB")
    }catch(err){
        console.log("Cannot connect to DB")
        console.log(err)
    }
    console.log(`Server is running at port ${process.env.PORT}`)
})



