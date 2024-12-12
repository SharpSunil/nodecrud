import express from "express";
import db from "./database/db.js";
import router from "./routes/workerRoutes.js";

const data = express(); //variable define
data.use(express.json()); // convert data in json format

const port = 4000; //create variable for default port

data.listen(port, () => {
  console.log(`Hello local server : ${port}`); //listen use for call server
});

data.get("/", (req, res) => {
  res.send("data send");
  console.log("data");
});


data.use("/worker", router)  //import router 

// Database Connection
try {
  db.query("SELECT 1");
  console.log("Database Connected Successfully");
} catch (error) {
  console.log(error);
}
