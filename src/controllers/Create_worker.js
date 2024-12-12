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
