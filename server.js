const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const LocalStrategy = require("passport-local");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser("secretKey"));
app.use(
  session({
    secret: "secretKey",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(function (username, password, done) {
      
    if (username === "hebera20@gmail.com" && password === "busta")
        return done(null,{id:1, name:"Ariel"});

    done(null, false);
    
  })
);

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){
    //buscar id en bd
    done(null, {id:1, name:'Ariel'});
})

app.set("view engine", "ejs");

app.get("/", (req, res, next) => {
    if(req.isAuthenticated()) return next();
    
    res.redirect("/login");
  
},(req, res)=>{
    res.send("hola");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", passport.authenticate('local',{
    successRedirect: "/",
    failureRedirect: "/login"
}));

app.listen(8080, () => console.log("server start"));
