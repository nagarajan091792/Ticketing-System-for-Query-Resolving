

const express = require("express");
const zen = express();
const cors = require("cors");
const mongodb = require("mongodb");
const mongoClient = mongodb.MongoClient;
const dotenv = require("dotenv").config();
const URL = process.env.DB;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL = process.env.EMAIL;
const EMAIL_SECRET = process.env.EMAIL_SECRET;

zen.use(express.json());
zen.use(
  cors({
    orgin: "*",
  })
);

zen.set("view engine", "ejs");
zen.use(express.urlencoded({ extended: false }));

var nodemailer = require("nodemailer");

// Authorize-------------------------------------------------------------
const authorize = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let decodedToken = jwt.verify(req.headers.authorization, JWT_SECRET);
      if (decodedToken) {
        req.userid = decodedToken._id;
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } else {
      res.status(401).json({ message: "Invaild Token" });
    }
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
};

//User Login--------------------------------------------------------------
zen.post("/user/login", async (req, res) => {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("Zen-Ticketing");
    const user = await db
      .collection("users")
      .findOne({ useremail: req.body.useremail });
    if (user) {
      const compare = await bcryptjs.compare(
        req.body.userpassword,
        user.userpassword
      );
      if (compare) {
        const usertoken = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "150m",
        });
       
        res.json({
          message: "Successfully Login",
          usertoken,
          userid: user._id,
          username: user.username,
        });
      } else {
        res.json({ message: "Incorrect Username/Password" });
      }
    } else {
      res.json({ message: "Incorrect Username/Password, Please Register"});
    }
    await connection.close();
  } catch (error) {
    console.log(error);
  }
});

// User Register------------------------------------------------------------------------------------------
zen.post("/user/register", async (req, res) => {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("Zen-Ticketing");
    const oldUser = await db
      .collection("users")
      .findOne({ useremail: req.body.useremail });
    if (oldUser) {
      return res.json({ message: "User Already Exists!!" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(req.body.userpassword, salt);
    req.body.userpassword = hash;
    await db.collection("users").insertOne(req.body);
    await connection.close();
    res.json({ message: "Register Successfully" });
  } catch (error) {
    console.log(error);
  }
});

//user addquery --------------------------------------------------------------------
zen.post("/userportal/addquery", authorize, async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("Zen-Ticketing");
    req.body.userid = mongodb.ObjectId(req.userid);
   
    const result = await db
      .collection("users")
      .find({ _id: mongodb.ObjectId(req.userid) })
      .toArray();
   
    req.body.username = result[0].username;
    await db.collection("query").insertOne(req.body);
    await connection.close();
    res.json({
      message: "Query added successfully",
    });
  } catch (error) {
    console.log(error);
  }
});
// mentor add solvequery --------------------------------------------------------------------
zen.put("/mentorportal/solvequery/:id", authorize, async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("Zen-Ticketing");
    req.body.solveid = mongodb.ObjectId(req.solveid);
    await db
      .collection("query")
      .updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: req.body });

    await connection.close();
    res.json({
      message: "Query added successfully",
    });
  } catch (error) {
    console.log(error);
  }
});
// get particular user all query--------------------------------------------------------------------------------------------------
zen.get("/userportal/getquery", authorize, async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("Zen-Ticketing");
    const result = await db
      .collection("query")
      .find({ userid: mongodb.ObjectId(req.userid) })
      .toArray();
    await connection.close();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

// get Unsolve query mentor------------------------------------
zen.get("/mentorportal/getunsolvedquery", authorize, async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("Zen-Ticketing");

    const result = await db
      .collection("query")
      .find({ solvementorname: { $not: /.*.*/ } })
      .toArray();

   
    await connection.close();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
// get Solve query mentor------------------------------------
zen.get("/mentorportal/getsolvedquery", authorize, async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("Zen-Ticketing");

    const result = await db
      .collection("query")
      .find({ solvementorname: /.*.*/ })
      .toArray();

   
    await connection.close();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});
// get particular user query view-------------------------------------
zen.get("/portal/query/:id", authorize, async function (req, res) {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("Zen-Ticketing");
    const result = await db
      .collection("query")
      .findOne({ _id: mongodb.ObjectId(req.params.id) });
   
    await connection.close();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

//Mentor Login--------------------------------------------------------------
zen.post("/mentor/login", async (req, res) => {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("Zen-Ticketing");
    const mentor = await db
      .collection("mentors")
      .findOne({ mentoremail: req.body.mentoremail });
    if (mentor) {
      const compare = await bcryptjs.compare(
        req.body.mentorpassword,
        mentor.mentorpassword
      );
      if (compare) {
        const mentortoken = jwt.sign({ _id: mentor._id }, JWT_SECRET, {
          expiresIn: "150m",
        });
        
        res.json({
          message: "Successfully Login",
          mentortoken,
          mentorid: mentor._id,
          mentorname: mentor.mentorname,
        });
      } else {
        res.json({ message: "Incorrect Username/Password" });
      }
    } else {
      res.json({ message: "Incorrect Username/Password, Please Register" });
    }
    await connection.close();
  } catch (error) {
    console.log(error);
  }
});
// Mentor Register------------------------------------------------------------------------------------------
zen.post("/mentor/register", async (req, res) => {
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("Zen-Ticketing");
    const oldMentor = await db
      .collection("mentors")
      .findOne({ mentoremail: req.body.mentoremail });
    if (oldMentor) {
      return res.json({ message: "User Already Exists!!" });
    }
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(req.body.mentorpassword, salt);
    req.body.mentorpassword = hash;
    await db.collection("mentors").insertOne(req.body);
    await connection.close();
    res.json({ message: "Register Successfully" });
  } catch (error) {
    console.log(error);
  }
});
zen.get("/", (req, res) => res.send(`Server Active`));
zen.listen(process.env.PORT || 5000);



zen.post("/forgot-password", async (req, res) => {
 
  try {
      const connection = await mongoClient.connect(URL)
      const db = connection.db("Zen-Ticketing")
      const user = await db.collection("users").findOne({useremail:req.body.useremail})
    if (!user) {
     return  res.json({ message: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + user.userpassword;
    const token = jwt.sign({ email: user.useremail, id: user._id }, secret, {expiresIn: "15m", });
    const link = `https://zenclass-ticketing-system.onrender.com/reset-password/${user._id}/${token}`;
    console.log(link)
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL,
        pass: EMAIL_SECRET
      }
    });

    var mailOptions = {
      from: EMAIL,
      to: req.body.useremail,
      subject: "Password Reset",
      text: link
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    res.json({ message: "check your email" });
  } catch (error) {
    console.log(error)
  }
});


zen.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  try {
  const connection = await mongoClient.connect(URL)
      const db = connection.db("Zen-Ticketing")
      const user = await db.collection("users").findOne({ _id: mongodb.ObjectId(id) })
  const secret = JWT_SECRET + user.userpassword;
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.useremail, status: "Not Verified" });
  } catch (error) {
    res.send("Not Verified")
    console.log(error); 
  }
});

zen.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  try {
  const connection = await mongoClient.connect(URL)
  const db = connection.db("Zen-Ticketing")
  const user = await db.collection("users").findOne({ _id: mongodb.ObjectId(id) })
  const secret = JWT_SECRET + user.userpassword;
    const verify = jwt.verify(token, secret);
    const salt = await bcryptjs.genSalt(10)
      const hash = await bcryptjs.hash (password,salt)
      const result = await db.collection("users").updateOne({ _id: mongodb.ObjectId(req.params.id) }, { $set: {userpassword:hash} });
    res.render("index", { email: verify.useremail, status: "verified" });
  } catch (error) {
    console.log(error);
  }
});


