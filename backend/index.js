import express  from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt"
import passport from "passport";
import session from "express-session";
import { Strategy } from "passport-local";
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

app.use(session({
  secret: 'secret', // replace 'yourSecretKey' with a strong, unique key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}))

app.use(passport.initialize())
app.use(passport.session())

const db = new pg.Client({
  user: "postgres",
  database: "networking",
  host: "localhost",
  password:"Dkkande",
  port: 5432
})

db.connect();

passport.use("local", new Strategy(async function verify(username, password, cb){

  try {
    const result = await db.query("SELECT * FROM networking_users WHERE username=$1", [username])
    console.log(result.rows)
    if(result.rows.length > 0){
      const user = result.rows[0]
      const storedPassword = user.password;

      bcrypt.compare(password, storedPassword, (err, result)=>{
        if(err){
          return cb(err)
        }else{
          if(result){
            return cb(null, user)
          }else{
            return cb(null, false)
          }

        }
      })

  
    }else{
      return cb("Ooops..! The email or password didn't match, try it again Or register")
    }

  } catch (error) {
    return cb(error)
  }
}))

app.get("/", (req, res)=>{
  res.send("<h1>Hello from the Server</h1>")
});

app.get("/stores", async(req, res)=>{
  try {
    const allStores = await db.query("SELECT * FROM stores")
    console.log(allStores.rows)
    res.json(allStores.rows)
  } catch (error) {
    console.log(error)
  }
 
})


app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}))

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
})

// app.post("/login", passport.authenticate("local", {
//   successRedirect: "/",
//   failureRedirect: "/login"
// }))


passport.serializeUser((user, cb)=>{
  cb(null, user)
})
passport.deserializeUser((user, cb)=>{
  cb(null, user)
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})

