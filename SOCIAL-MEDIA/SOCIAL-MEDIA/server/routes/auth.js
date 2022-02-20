const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req,res) =>{
   
        try{
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
            //create new user
            const newUser = await new User({
                username:req.body.username,
                email:req.body.email,
                password:hashedPassword
            });
    
            //save user and return response
            await newUser.save((err,user)=>{

                if(err && err.code!=11000){
                    console.log(err);
                    return;
                }

                //check for duplictae user
                if(err && err.code==11000){
                    res.status(200).json("User already exist");
                    return;
                }

                res.status(200).json("Registration successful");
            });
            
        }catch(err){
            console.log(err);
        }
    
});


//LOGIN
router.post("/login", async(req, res) =>{

    try{

        //Validate email
        const user = await User.findOne({email:req.body.email});
        !user && res.status(404).json("User not found");

        //Password validation
        const validPasswodr = await bcrypt.compare(req.body.password, user.password);
        !validPasswodr && res.status(400).json("Incorrect Password");

        res.status(200).json(user);
        
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;