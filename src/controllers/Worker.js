import express, { response } from "express";
import db from "../database/db.js";


export const createworker = async (req, res) => {
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

    // Check for duplicate entries first
    const [duplicate] = await db.query(
      "SELECT * FROM worker WHERE worker_card_number = ? OR worker_pan_number = ? OR worker_uid_number = ?",
      [worker_card_number, worker_pan_number, worker_uid_number]
    );

    if (duplicate.length > 0) {
      return res.status(400).json({
        message: "This data already exists.",
      });
    }

    // Insert the worker data
    const [worker] = await db.query(
      "INSERT INTO worker (worker_name,worker_mobile,worker_mail,worker_roll,worker_dob,worker_jobdesc,worker_address,worker_team,worker_card_number,worker_uid_number,worker_pan_number,worker_nominee_name) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
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

    // Get the inserted worker's ID
    const workerId = worker.insertId;

    // Send success response
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
      status: "Successful",
    });
  } catch (error) {
    // Handle errors gracefully
    res.status(500).json({
      error: error.message,
      status: "Not Successful",
    });
  }
};

export const viewworker = async (req, res) => {
  try {
    const [response] = await db.query("SELECT * FROM worker");

    res.status(200).json({
      data: response,
      status: "Success",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      status: "error",
    });
  }
};

export const getworker = async (req, res) => {
  try {
    const { id } = req.params;
    const [response] = await db.query("SELECT * FROM worker WHERE id = ?", id);

    res.status(200).json({
      data: response,
      status: "Success",
    });
  } catch (error) {
    res.status(500).json({
      message: error,
      status: "error",
    });
  }
};

export const updateworker = async (req, res) => {
  try {
    const { id } = req.params;  // Extracting id from the URL parameter
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
    } = req.body;  // Extracting fields from the request body

    // Correcting the SQL query by removing duplicate worker_address
    const [response] = await db.query(
      "UPDATE worker SET worker_name = ?, worker_mobile = ?, worker_mail = ?, worker_roll = ?, worker_dob = ?, worker_jobdesc = ?, worker_address = ?, worker_team = ?, worker_card_number = ?, worker_uid_number = ?, worker_pan_number = ?, worker_nominee_name = ? WHERE id = ?",
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
        id,  // Adding id as the last parameter for WHERE clause
      ]
    );

    // Query to get the updated worker record after the update
    const [updatedResponse] = await db.query("SELECT * FROM worker WHERE id = ?", [id]);

    res.status(200).json({
      data: "success",
      message: updatedResponse,  // Returning the updated worker data
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,  // Improved error response with error message
    });
  }
};

export const deleteworker = async (req, res) => {
  try {
    const {id} = req.params
    const response = db.query("DELETE FROM worker WHERE id = ?", [id]);
    res.status(200).json({
      status:"Success",
      message:"Data Deleted Successfully"
    })
  } catch (error) {
    res.status(500).json({
      message:error
    })
    
  }
}


