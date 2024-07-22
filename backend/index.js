import express  from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt"
import env from "dotenv";
import cors from "cors";
import pg from "pg";

// const bcrypt = bcrypt
const app = express();
const port = 5001
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

env.config();
app.use(bodyParser.json())
app.use(cors())

const db = new pg.Client({
  user: "postgres",
  database: "networking",
  host: "localhost",
  password:"Dkkande",
  port: 5432
})

db.connect();

app.get("/", (req, res)=>{
  res.send("<h1>Hello from the Server</h1>")
})

bcrypt.genSalt(saltRounds, function(err, salt){
  bcrypt.hash(myPlaintextPassword, salt, function(err, hash){
     
  }) 
})
app.post("/registration", async(req, res)=>{
  const {username, email, password} = req.body;
  // console.log(username, email, password)

 try {
  const userExist = await db.query("SELECT * FROM networking_users WHERE email = $1", [email])
  if(userExist.rows.length>0){
    console.log("email already exist, try to log in.")
  }else{
    bcrypt.hash(password, saltRounds, async function(err, hash){
     if(err){
      console.log(err)
     }else{
      const newUser = await db.query("INSERT INTO networking_users (user_name, email, user_password) VALUES($1, $2, $3)", [username, email, hash])
      console.log(newUser)
     }
    }) 
  }
 } catch (error) {
  console.log(error)
 }
// try {
//   const newUser = await db.query("INSERT INTO networking_users (user_name, email, user_password) VALUES($1, $2, $3)", [username, email, password])
//   console.log(newUser)
// } catch (error) {
//   console.log(error)
// }  
// res.json({message: "Hello from the Server"})
})


app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

