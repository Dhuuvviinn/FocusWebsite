import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
//CORS
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}))
//limited json Data
app.use(express.json({limitL:"16kb"}))
//manage the space and unnecessary url content
app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))

//To get the cookie value and save the cookie
app.use(cookieParser())
export {app}