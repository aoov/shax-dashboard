// SuperSecurePassword1
const mySQL = require("mysql");

const express = require("express");

const app = express();

// const bodyParser = require("body-parser");

const cors = require("cors");

const db = mySQL.createPool({
  host: "localhost",
  user: "root",
  password: "SuperSecurePassword1",
  database: "shaxdatabase",
});

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: true }));

app.post("/api/insert", (req, res) => {
  const sqlInsert = "INSERT INTO employee_accounts (user, email, password) VALUES (?, ?, ?)";

  db.query(sqlInsert, [req.body.user, req.body.email, req.body.password], () => {
    if (res) {
      // Send OK
      res.sendStatus(200);
    } else {
      // Send Error Code
      res.sendStatus(-1);
    }
  });
});

app.post("/api/sign-in", (req, res) => {
  const sql = "select * from employee_accounts where email = ? and password = ?";
  db.query(sql, [req.body.email, req.body.password], (error, result) => {
    console.log(req.body.email, req.body.password);
    console.log(error);
    console.log(result);
    if (result !== 0) {
      // Send OK
      res.sendStatus(200);
      console.log("sent 200");
    } else {
      // Send Forbidden Code
      res.sendStatus(403);
    }
  });
});

app.get("/api/get/products", (req, res) => {
  db.query("select * from products", (error, result) => {
    res.send(result);
  });
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
