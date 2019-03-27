const express = require("express");
const mysql = require("mysql");
const Joi = require("joi");
const app = express();
const ui = express();
const cors = require("cors");
const path = require("path");
app.use(express.json());

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "123456",
  database: "nodemysql"
});

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

// Serve only the static files form the dist directory
ui.use(express.static(__dirname + "/dist/ICCUS-Client"));

ui.get("/*", function(req, res) {
  ui.sendFile(path.join(__dirname + "/dist/ICCUS-Client/index.html"));
});
// connect
db.connect(err => {
  if (err) {
    console.log(err);
  }
  console.log("My sql Connected ...");
});

// Create DB
app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(400).send(`Can't create table`);
    }
    res.send("databse created");
  });
});

// Create Table
app.get("/createtable", (req, res) => {
  let sql =
    "CREATE TABLE Customer(id int AUTO_INCREMENT, Name VARCHAR(50), FirstName VARCHAR(50), Address VARCHAR(255), PostalCode VARCHAR(8), City VARCHAR(20), Phone VARCHAR(10), Comments TEXT, Email VARCHAR(50), PRIMARY KEY (id))";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    // console.log(result);
    res.send("Table Created");
  });
});

app.get("/customers", (req, res) => {
  let sql = "SELECT * FROM customer";
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send(results);
  });
});

app.get("/customers/:id", (req, res) => {
  let sql = "SELECT * FROM customer WHERE id = ?";
  db.query(sql, req.params.id, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

app.delete("/customers/:id", (req, res) => {
  let sql = `DELETE FROM customer WHERE id = ${req.params.id}`;
  console.log(`VALUE : |${req.params.id}|`);
  let query = db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("DELETED sucessfully.");
  });
});

app.put("/customers/:id", (req, res) => {
  const scheme = {
    name: Joi.string()
      .min(3)
      .max(50)
      .optional(),
    firstname: Joi.string()
      .min(3)
      .max(50)
      .optional(),
    address: Joi.string()
      .min(3)
      .max(200)
      .optional(),
    postalcode: Joi.string()
      .min(3)
      .max(8)
      .optional(),
    city: Joi.string()
      .min(3)
      .max(20)
      .optional(),
    phone: Joi.string()
      .max(10)
      .optional(),
    comments: Joi.string().max(1000),
    email: Joi.string()
      .min(4)
      .max(20)
      .optional()
  };
  const valid = Joi.validate(req.body, scheme);
  if (valid.error) {
    res.status(400).send(valid.error.details[0].message);
    return;
  }
  const sql = `UPDATE customer SET ? WHERE id = ?`;
  let query = db.query(sql, [req.body, req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.status(200).send("Updated sucessfully !");
    console.log(result);
  });
});
app.post("/customers", (req, res) => {
  const scheme = {
    name: Joi.string()
      .min(3)
      .max(50)
      .required(),
    firstname: Joi.string()
      .min(3)
      .max(50)
      .required(),
    address: Joi.string()
      .min(3)
      .max(200)
      .required(),
    postalcode: Joi.string()
      .min(3)
      .max(8)
      .required(),
    city: Joi.string()
      .min(3)
      .max(20)
      .required(),
    phone: Joi.string()
      .max(10)
      .required(),
    comments: Joi.string().max(1000),
    email: Joi.string()
      .min(4)
      .max(20)
      .required()
  };

  const {
    firstname,
    name,
    address,
    city,
    phone,
    email,
    comments,
    postalcode
  } = req.body;
  const valid = Joi.validate(req.body, scheme);
  if (valid.error) {
    // res.status(400).send(valid.error);
    res.status(400).send(valid.error.details[0].message);
    return;
  }
  const object = {
    name,
    firstname,
    address,
    city,
    phone,
    email,
    comments,
    postalcode
  };
  let sql = `INSERT INTO customer SET ?`;
  let query = db.query(sql, object, (err, result) => {
    if (err) {
      throw err;
    }
    object.id = result.insertId;
    res.status(200).send(object);
  });
});

app.listen("3000", () => {
  console.log("SERVER run at port 3000");
});
ui.listen(4201, () => {
  console.log("UI runn at port 4201");
});
