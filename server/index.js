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
  db.query(
    "select products.number, products.description, products.name, products.msrp, products.manufacturer, inventory.amount from products left join inventory on products.number=inventory.number",
    (error, result) => {
      console.log(result);
      res.send(result);
    }
  );
});

app.get("/api/get/incomingInventory", (req, res) => {
  db.query(
    "select inventory_deliveries.id as id, inventory_deliveries.supplier as supplier, date_format(inventory_deliveries.datePlaced, '%m-%d-%y') as datePlaced, date_format(inventory_deliveries.dateIncoming, '%m-%d-%y') as dateIncoming, count(inventory_delivery_items.deliveryID) as numberOfItems from inventory_deliveries left join inventory_delivery_items on (inventory_deliveries.id=inventory_delivery_items.deliveryID);",
    (error, result) => {
      console.log(result);
      res.send(result);
    }
  );
});

app.get("/api/get/test", (req, res) => {
  db.query(
    "select id, supplier, date_format(datePlaced, '%m-%d-%y') as datePlaced, date_format(dateIncoming, '%m-%d-%y') as dateIncoming from inventory_deliveries ",
    (error, result) => {
      console.log(result);
      res.send(result);
    }
  );
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
