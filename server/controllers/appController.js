import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
// import ENV from "../config.js";
import otpGenerator from "otp-generator";
import VillagerModel  from "../model/Vllager.model.js";
import GuestModel from "../model/Guest.model.js";

/** middleware for verify user */
export async function verifyUser(req, res, next) {
    try {
        const { username } = ((req.method == "GET") || (req.method == "DELETE")) ? req.query : req.body;

        // check the user existence
        const exist = await UserModel.findOne({ email: username });
        if (!exist)
            return res.status(404).send({ error: "Username not Found" });
        next();
    } catch (error) {
        return res.status(404).send({ error: "Authentication Failed" });
    }
}

/** POST: http://localhost:4040/api/register
 * @param : {
  "name": "user01",
  "email": "user01@gmail.com",
  "password": "user01@abc",
  "confirmPassword": "user01@abc"
  }
*/
export async function register(req, res) {

    const { role, password,contact, email,} = req.body;
    console.log(req.body);

    
    try {
        // check for existing email
        const existEmail = await UserModel.findOne({ email });
        // const existNIC = await UserModel.findOne({ nic });
        const existContact = await UserModel.findOne({ contact });
        let error = {};
        if (existEmail) {error.email = "Please use unique Email";}
        // if (existNIC) {error.nic = "Please use unique NIC";}
        if (existContact) {error.contact = "Please use unique Contact Number";}
        if (!(Object.keys(error).length === 0 && error.constructor === Object)) {
            return res.status(500).send({ error });
        } else {
            if (password) {
                bcrypt
                .hash(password, 8)
                .then(async (hashedPassword) => {
                    console.log(hashedPassword);
                    let user;
                    if (role === "GN") {
                        const {
                            name,
                            address,
                            role,
                            gsDivision,
                            divisionNumber,
                        } = req.body;
                        console.log(req.body);
                        user =  new UserModel({
                            name,
                            address,
                            nic,
                            contact,
                            email,
                            role,
                            gsDivision,
                            divisionNumber,
                            password: hashedPassword,
                        });

                    } else if (role === "ORG") {
                        const {
                            name,
                            gsDivision,
                            divisionNumber,
                            boardName,
                            boardAddress,
                            boardPhone,
                            boardEmail,
                            image
                        } = req.body;
                        image
                          ? image
                          : "https://img.freepik.com/free-vector/corporate-meeting-employees-cartoon-characters-discussing-business-strategy-planning-further-actions-brainstorming-formal-communication-seminar-concept-illustration_335657-2035.jpg?w=740&t=st=1693746333~exp=1693746933~hmac=1a28786bb8bb7349dc65d62f7fb3dd8580339ed226dacc49927304fa9125c73c";
                        user = new UserModel({
                          name,
                          email,
                          gsDivision,
                          divisionNumber,
                          contact,
                          boardName,
                          boardAddress,
                          nic,
                          boardPhone,
                          boardEmail,
                          role,
                          password: hashedPassword,
                        });
                        
                    }else if(role === "Villager"){
                        console.log(nic)
                        // const result = await validatenic()
                        // console.log(result)
                        const existuser = await UserModel.findOne({nic})
                        if(existuser){
                            res.status(404).send({type : "error" , message : "User Already Exists"})
                        }else{
                            const existnic = await VillagerModel.findOne({nic})
                            if(existnic){
                                const{name} = req.body;
                                user = await new UserModel({
                                    name,
                                    address : existnic.address,
                                    nic,
                                    contact,
                                    email,
                                    role,
                                    gsDivision : existnic.gsDivision,
                                    divisionNumber : existnic.divisionNumber,
                                    password,
                                })
                            }else{
                                res.json({type : "error" , message : "We Cannot See any NIC Matches with Your NIC. Please Meet Your Grama Niladhari"})
                            }
                        }
                    }else if(role === "Guest"){

                        const{members,newgsDivision,oldgsDivision,GuestVillager,address} = req.body
                        // console.log(req.body)
                        const existemail = await UserModel.findOne({"email" : GuestVillager.email})
                        // console.log(existemail);
                        if(!existemail){
                            console.log("HI")
                            user =  new GuestModel({
                                email,
                                address,
                                GuestVillager,
                                members,
                                newgsDivision,
                                oldgsDivision,
                                password : hashedPassword,
                                newdivisionnumber,
                                contact

                            });
                            console.log(user);
                        }
                        
                    }
                    // return res.status(500).send(user);
                        

                        // return save result as a response
                        const respond =  await user.save()
                        console.log(respond)
                             user.save().then((result) =>
                                res
                                    .status(201)
                                    .send({ msg: "Register Successfully" })
                            )
                            .catch((error) =>
                                res.status(500).send({ error:"vcfggy" })
                            );
                    })
                    .catch((error) => {
                        return res.status(500).send({
                            error: "Enable to hashed password",
                        });
                    });
            }
        }
            
    } catch (error) {
        return res.status(500).send(error);
    }
}

/** POST: http://localhost:4040/api/login
 * @param : {
  "username": "user01@gmail.com",
  "password": "user01@abc"
  }
*/
export async function login(req, res) {
    const { username, password } = req.body;

    try {
        await UserModel.findOne({ email: username })
            .then((user) => {
                bcrypt
                    .compare(password, user.password)
                    .then((passwordCheck) => {
                        if (!passwordCheck)
                            return res
                                .status(404)
                                .send({ error: "Password does not match" });

                        // create JWT token
                        const token = jwt.sign(
                            {
                                userId: user._id,
                                name: user.name,
                                username: user.email,
                                role: user.role,
                            },
                            process.env.JWTSECRET,
                            { expiresIn: "24h" }
                        );

                        return res.status(200).send({
                            msg: "Login Successfully...!",
                            username: user.email,
                            role: user.role,
                            token,
                            type : "success",
                            name : user.name
                        });
                    })
                    .catch((error) => {
                        return res
                            .status(404)
                            .send({ error: "Password does not match" });
                    });
            })
            .catch((error) => {
                return res.status(404).send({ error: "Username not Found" });
            });
    } catch (error) {
        return res.status(500).send({ error });
    }
}

/** GET: http://localhost:4040/api/user/:id */
/** GET: http://localhost:4040/api/getUser/:username */
export async function getUser(req, res) {
    let _id = "";
    let email = "";
    req.params.id ? (_id = req.params.id) : (email = req.params.username);
    console.log(email);

    try {
        if (!_id && !email) return res.status(404).send({ error: "Invalid userID or username" });

        try {
            let user = "";
            if (_id) {
                user = await UserModel.findOne({ _id });
                console.log(user);
            } else {
                user = await UserModel.findOne({ email });
                console.log(user)
            }

            if (!user)
                return res.status(501).send({ error: "Cannot find user data" });

            /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
            const { password, ...rest } = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        } catch (error) {
            return res.status(500).send({ error });
        }
    } catch (error) {
        return res.status(501).send({ error: "Cannot find user data" });
    }
}

/** GET: http://localhost:4040/api/getUsers/:role */
export async function getUsers(req, res) {
    const{nic} = req.body;
    console.log(nic);
    const users = await VillagerModel.find({
	members: {
		$elemMatch: {
	nic: nic
}
}
})

    console.log(users);
    // let userRole = req.params.role;
    // try {
    //     if (!userRole) return res.status(404).send({ error: "Invalid URL" });
        
    //     try {
    //         let users = await UserModel.find({ role: userRole });;
    //         // return res.status(201).send(users);

    //         if (!users)
    //             return res.status(501).send({ error: "Cannot find users data" });

    //         /** remove password from users */
    //         // mongoose return unnecessary data with object so convert it into json
    //         let data = [];
    //         users.forEach(user => {
    //             const { password, ...rest } = Object.assign({}, user.toJSON());
    //             data.push(rest);
    //         });

    //         return res.status(201).send(data);
    //     } catch (error) {
    //         return res.status(500).send({ error });
    //     }
    // } catch (error) {
    //     return res.status(501).send({ error: "Cannot find users data" });
    // }
}

/** PUT: http://localhost:4040/api/updateuser */
export async function updateUser(req, res) {
    try {
        const { userId } = req.user;
        if (userId) {
            const body = req.body;
            try {
                const updateOk = await UserModel.findByIdAndUpdate( { _id: userId }, body, { new: true } );
                if (!updateOk) {
                    return res.status(501).send({ error: "Cannot update user data" });
                }
                return res.status(201).send({ msg: "Update Successfully" });
            } catch (error) {
                return res.status(500).send({ error });
            }
        } else {
            return res.status(401).send({ error: "User not found" });
        }
    } catch (error) {
        return res.status(401).send({ error });
    }
}

/** DELETE: http://localhost:4040/api/deletedata/:id */
export async function deleteData(req, res) {
    let id = req.params.id;
    try {
        const deleteOk = await UserModel.findByIdAndDelete(id);
        if (!deleteOk) {
            return res
                .status(501)
                .send({ error: "Cannot delete user data" });
        }
        return res.status(201).send({ msg: "Delete Successfully" });
    } catch (error) {
        return res.status(500).send({ error });
    }
}

/** GET: http://localhost:4040/api/generateOTP */
export async function generateOTP(req, res) {
    req.app.locals.OTP =  otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
    res.status(201).send({ code: req.app.locals.OTP });
}

/** GET: http://localhost:4040/api/verifyOTP */
export async function verifyOTP(req, res) {
    const { code } = req.query;
    if (parseInt(req.app.locals.OTP) === parseInt(code)) {
        req.app.locals.OTP = null;  // reset the OTP value
        req.app.locals.resetSession = true;  // start session for reset password
        return res.status(201).send({ msg: "Verify Successfully!" });
    }
    return res.status(400).send({ error: "Invalid OTP" });
}

// Successfully redirect user when OTP is valid
/** GET: http://localhost:4040/api/createResetSession */
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        return res.status(201).send({ flag: req.app.locals.resetSession });
    }
    return res.status(440).send({ error: "Session expired!" });
}

// update the password when we have valid session
/** PUT: http://localhost:4040/api/resetPassword */
export async function resetPassword(req, res) {
    try {

        if (!req.app.locals.resetSession) return res.status(440).send({ error: "Session expired!" });

        const { username, password } = req.body;
        
        const user = await UserModel.findOne({ email: username });
        if (user && password) {
            const hashedPassword = await bcrypt.hash(password, 8);
            if (!hashedPassword) {
                return res.status(500).send({ error: "Enable to hashed password" });
            }
            const resetOk = await UserModel.updateOne({ email: user.email }, { password: hashedPassword });
            if (!resetOk) {
                return res.status(500).send({ error: "Enable to reset password" });
            }
            req.app.locals.resetSession = false;
            return res.status(201).send({msg: "Password reset successfully!"});
        }
        return res.status(404).send({ error: "Username or password not found" });
        
    } catch (error) {
        return res.status(401).send({ error });
    }
}

export async function generateOTPMobile(req, res) {
  try {
    const { email } = req.body;
    console.log(email);
    const existuser = await user.findOne({ email });
    console.log(existuser);
    if (existuser) {
      console.log("User Exist");
      const token = jwt.sign({ email: email }, process.env.JWTSECRET, {
        expiresIn: "15m",
      });
      console.log(token);
      console.log(token);
      var generateotp = otpgenerate.generate(4, {
        digits: true,
        lowerCaseAlphabets: false,
        specialChars: false,
        upperCaseAlphabets: false,
      });
      // var salt = await bcrypt.genSalt(10)
      // generateotp = bcrypt.hash(generateotp,5)
      // generateotp = await hashpassword(generateotp);
      var generateotps = bcrypt.hashSync(generateotp);
      console.log(generateotps);
      const role = existuser.role;
      console.log(role);
      const userdetails = await getroledeatils(role, existuser.email);
      console.log(userdetails);
      const otps = await new OTP({
        otp: generateotps,
        email: existuser.email,
        token: token,
      });
      await otps.save();

      const smsresponse = await smssender(
        userdetails.mobile,
        "Dear " +
          userdetails.name.toUpperCase() +
          ",\\n" +
          "Your OTP for Reset Password Process is " +
          "\\n" +
          generateotp +
          "\\n" +
          "This OTP is Only Valid for 15 minutes." +
          "\\n" +
          "\\n" +
          "Thank You." +
          "\\n" +
          "Fight The Bites Team"
      );

      console.log(smsresponse.status);
      // await smssender()
      // console.log(smsresponse.data)
      // var smsresponses.status = 200;
      //  var smsresponses = 200;
      if (smsresponse.status == 200) {
        // console.log("hello");
        // console.log(userdetails.name);
        var emailing = {
          body: {
            name: userdetails.name.toUpperCase(),
            greeting: "Dear",
            signature: "Yours Sincerely",
            intro: "Your Reset Passaword OTP is " + generateotp,
            outro: "You can contact us anytime",
          },
        };
        var bodyemail = mailgenerate.generate(emailing);
        let message = {
          from: "onlinesite1998@gmail.com",
          to: email,
          subject: "Reset Password",
          html: bodyemail,
        };
        transport.sendMail(message).catch((err) => console.log(err));
        console.log("hello");
        res.json({
          type: "success",
          user: email,
          message: "OTP SENT",
          token: token,
        });
      } else {
        console.log("error");
        res.json({ type: "error", message: smsresponse.data });
      }
    } else {
      console.log("User ");
      res.json({ type: "error", message: "Invalid Email" });
    }
  } catch (error) {
    res.json({ type: "error", message: error });
  }
};

export async function verifyotpMobile (req, res) {
  const { email, otp } = req.body;
  // console.log(req.email.email)
  if (req.email.email === email) {
    const uservalidation = await OTP.find({ email });
    // console.log(email)
    if (uservalidation.length > 0) {
      var uservalidations = await uservalidation[uservalidation.length - 1];
      console.log(uservalidations.otp);
      if (bcrypt.compareSync(otp, uservalidations.otp)) {
        //  console.log(uservalidations);
        uservalidations.verified = true;
        // console.log(uservalidations.token);
        // console.log(req.headers.authorization.split(" ")[1]);
        // const token = req.headers.authorization.split(" ")[1];
        // console.log(token === uservalidations.token)
        uservalidations.save();
        // console.log(uservalidation);
        res.json({ type: "success", message: "OTP Verified" });
      } else {
        // console.log('hi');
        res.json({ type: "error", message: "Invalid OTP" });
      }
    } else {
      // console.log("hello");
      res.json({ type: "error", message: "Invalid User" });
    }
  } else {
    res.json({ type: "error", message: "Invalid User" });
  }
};


export async function validateNIC(req, res) {
    //   let nic = req.params.nic;
    const nic = "473102457V";
      try {
        try {
          let users = await VillagerModel.find({
            members: {
              $elemMatch: {
                nic,
              },
            },
          });
          console.log(users);
          if (!users) {
            return res.status(501).send({ error: "Cannot find user data" });
          } else {
            let members = users[0].members;
            // console.log(members);
            // console.log(members)
            members.forEach((element) => {
              if (element.nic) {
                // console.log("IN")
                if (element.nic === nic) {
                 res.status(201).send(element);
                }
              }
            });
            // console.log(members)
          }

          return res.status(201).send("jkl");
        } catch (error) {
          res.status(500).send({ error });
        }
      } catch (error) {
        res.status(501).send({ error: "Cannot find user data" });
      }
}


// export async function get
