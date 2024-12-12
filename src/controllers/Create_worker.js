import express from "express";
import db from "../database/db.js";

 const createworker = async (req, res) => {
  try {
    const {
      worker_name,
      worker_mobile,
      worker_mail,
      worker_roll,
      worker_dob,
      worker_jobdesc,
      worker_address,
      worker_team,
      worker_card_number,
      worker_uid_number,
      worker_pan_number,
      worker_nominee_name,
    } = req.body;
    const [worker] = await db.query(
      "INSERT INTO worker (worker_name,worker_mobile,worker_mail,worker_roll,worker_dob,worker_jobdesc,worker_address,worker_team,worker_card_number, worker_uid_number, worker_pan_number,worker_nominee_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
      [
        worker_name,
        worker_mobile,
        worker_mail,
        worker_roll,
        worker_dob,
        worker_jobdesc,
        worker_address,
        worker_team,
        worker_card_number,
        worker_uid_number,
        worker_pan_number,
        worker_nominee_name,
      ]
    );
    const workerId = worker.insertId;
    res.status(200).json({
      newdata: {
        id: workerId,
        worker_name,
        worker_mobile,
        worker_mail,
        worker_roll,
        worker_dob,
        worker_jobdesc,
        worker_address,
        worker_team,
        worker_card_number,
        worker_uid_number,
        worker_pan_number,
        worker_nominee_name,
      },
      status: "SuccessFull",
    });
  } catch (error) {
    res.status(500).json({
      datasorted: error,
      status: "Not Successfull",
    });
  }
};

export default createworker;





app.get("/getAllusers", async (req, res) => {
  try {
    const [response] = await db.query("SELECT * FROM student");

    res.status(200).json({
      data: response,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      messgae: error,
      status: "error",
    });
  }
});

app.get("/getusersById/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [response] = await db.query(
      "SELECT * FROM student WHERE  id = ?",
      id
    );

    res.status(200).json({
      data: response,
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      messgae: error,
      status: "error",
    });
  }
});

app.put("/updateUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { Name, Email, Message } = req.body;

    const [response] = await db.query(
      "UPDATE student SET Name = ?, Email=?, Message=?  WHERE id = ?",
      [Name, Email, Message, id]
    );

    const [updatedResponse] = await db.query(
      "SELECT * FROM student WHERE  id = ?",
      id
    );

    res.status(200).json({
      data: "success",
      message: updatedResponse,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

app.delete("/deleteUser/:id", async (req, res) => {
    try {
        const {id} = req.params
        const response = db.query("DELETE FROM student WHERE id = ?", [id]);


        res.status(200).json({
            status:"success",
            message:"delete succesffully"
        })
    } catch (error) {
        res.status(500).json({
            message:error
        })
    }
});