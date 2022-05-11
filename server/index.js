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

app.post("/api/insert/account", (req, res) => {
  const sqlInsert = "INSERT INTO employee_accounts (user, email, password) VALUES (?, ?, ?)";

  db.query(sqlInsert, [req.body.user, req.body.email, req.body.password], () => {
    if (res) {
      // Send OK
      res.sendStatus(200);
    } else {
      // Send Error Code
      res.sendStatus(500);
    }
  });
});

app.post("/api/insert/product", (req, res) => {
  const sqlInsert =
    "INSERT INTO products (description, name, msrp, manufacturer) VALUES (?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [req.body.description, req.body.productName, req.body.MSRP, req.body.manufacturer],
    (error) => {
      if (error == null) {
        // Send OK
        res.sendStatus(200);
      } else {
        // Send Error Code
        res.sendStatus(500);
      }
    }
  );
});
app.post("/api/insert/delivery", (req, res) => {
  const sqlInsert =
    "INSERT INTO inventory_deliveries (supplier, datePlaced, dateIncoming, completed) VALUES (?, current_date(), ?, 0)";
  db.query(sqlInsert, [req.body.supplier, req.body.deliveryDate], (error) => {
    if (error == null) {
      // Send OK
      res.sendStatus(200);
    } else {
      // Send Error Code
      res.sendStatus(500);
    }
  });
});

app.post("/api/insert/deliveryItem", (req, res) => {
  const sqlInsert =
    "INSERT INTO inventory_delivery_items (deliveryID, productID, quantity) VALUES (?, ?, ?)";
  db.query(sqlInsert, [req.body.deliveryID, req.body.productID, req.body.quantity], (error) => {
    if (error == null) {
      // Send OK
      res.sendStatus(200);
    } else {
      // Send Error Code
      res.sendStatus(500);
    }
  });
});

app.post("/api/insert/orderItem", (req, res) => {
  const sqlInsert =
    "INSERT INTO customer_order_items (productID, quantity, orderID, cost) VALUES (?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [req.body.productID, req.body.quantity, req.body.orderID, req.body.cost],
    (error) => {
      if (error == null) {
        // Send OK
        res.sendStatus(200);
      } else {
        // Send Error Code
        res.sendStatus(500);
      }
    }
  );
});

app.post("/api/insert/order", (req, res) => {
  const sqlInsert =
    "INSERT INTO customer_orders (customerID, datePlaced, completed) VALUES (?, current_date(), 0)";
  db.query(sqlInsert, [req.body.customerID], (error) => {
    if (error == null) {
      // Send OK
      res.sendStatus(200);
    } else {
      // Send Error Code
      res.sendStatus(500);
    }
  });
});

app.post("/api/insert/customer", (req, res) => {
  const sqlInsert = "INSERT INTO customers (name, address) VALUES (?, ?)";
  db.query(sqlInsert, [req.body.customerName, req.body.customerAddress], (error) => {
    if (error == null) {
      // Send OK
      res.sendStatus(200);
    } else {
      // Send Error Code
      res.sendStatus(500);
    }
  });
});

app.post("/api/sign-in", (req, res) => {
  const sql = "select * from employee_accounts where email = ? and password = ?";
  db.query(sql, [req.body.email, req.body.password], (error, result) => {
    if (result !== 0) {
      // Send OK
      res.sendStatus(200);
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
      res.send(result);
    }
  );
});

app.get("/api/get/customers", (req, res) => {
  db.query("select * from customers", (error, result) => {
    res.send(result);
  });
});

app.get("/api/get/deliveryID", (req, res) => {
  db.query("select count(*) as last_id from inventory_deliveries", (error2, result2) => {
    res.send(result2);
  });
});

app.get("/api/get/productID", (req, res) => {
  db.query("select count(*) as last_id from products", (error2, result2) => {
    res.send(result2);
    db.query("insert into inventory (number, amount) values (?, 0)", [result2[0].last_id]);
  });
});

app.get("/api/get/customerID", (req, res) => {
  db.query("select count(*) as last_id from customers", (error2, result2) => {
    res.send(result2);
  });
});

app.get("/api/get/orderID", (req, res) => {
  db.query("select count(*) as last_id from customer_orders", (error2, result2) => {
    res.send(result2);
  });
});

app.get("/api/get/incomingInventory", (req, res) => {
  db.query(
    "SELECT inventory_deliveries.id, inventory_deliveries.supplier, DATE_FORMAT(inventory_deliveries.datePlaced, '%y-%m-%d') AS datePlaced, DATE_FORMAT(inventory_deliveries.dateIncoming, '%y-%m-%d') AS dateIncoming, COUNT(inventory_delivery_items.deliveryID) AS numberOfItems, SUM(inventory_delivery_items.quantity) AS totalItems FROM inventory_deliveries right JOIN inventory_delivery_items ON (inventory_deliveries.id = inventory_delivery_items.deliveryID) where inventory_deliveries.completed != 1 GROUP BY inventory_deliveries.id",
    (error, result) => {
      res.send(result);
    }
  );
});

app.get("/api/get/completedIncomingInventory", (req, res) => {
  db.query(
    "SELECT inventory_deliveries.id, inventory_deliveries.supplier, DATE_FORMAT(inventory_deliveries.datePlaced, '%y-%m-%d') AS datePlaced, DATE_FORMAT(inventory_deliveries.dateIncoming, '%y-%m-%d') AS dateIncoming, COUNT(inventory_delivery_items.deliveryID) AS numberOfItems, SUM(inventory_delivery_items.quantity) AS totalItems FROM inventory_deliveries right JOIN inventory_delivery_items ON (inventory_deliveries.id = inventory_delivery_items.deliveryID) where inventory_deliveries.completed != 0 GROUP BY inventory_deliveries.id",
    (error, result) => {
      res.send(result);
    }
  );
});

app.get("/api/get/customerOrders", (req, res) => {
  db.query(
    "SELECT customer_orders.orderID, customer_orders.customerID, DATE_FORMAT(customer_orders.datePlaced, '%y-%m-%d') AS datePlaced, COUNT(customer_order_items.orderID) AS numberOfItems, SUM(customer_order_items.quantity) AS totalItems FROM customer_orders RIGHT JOIN customer_order_items ON (customer_orders.orderID = customer_order_items.orderID) WHERE customer_orders.completed != 1 GROUP BY customer_orders.orderID",
    (error, result) => {
      res.send(result);
    }
  );
});

app.get("/api/get/completedCustomerOrders", (req, res) => {
  db.query(
    "SELECT customer_orders.orderID, customer_orders.customerID, DATE_FORMAT(customer_orders.datePlaced, '%y-%m-%d') AS datePlaced, COUNT(customer_order_items.orderID) AS numberOfItems, SUM(customer_order_items.quantity) AS totalItems FROM customer_orders RIGHT JOIN customer_order_items ON (customer_orders.orderID = customer_order_items.orderID) WHERE customer_orders.completed != 0 GROUP BY customer_orders.orderID",
    (error, result) => {
      res.send(result);
    }
  );
});

app.get("/api/get/outstandingOrders", (req, res) => {
  db.query(
    "select count(*) as amount from customer_orders where completed = 0",
    (error, result) => {
      res.send(result);
    }
  );
});

app.get("/api/get/totalCustomers", (req, res) => {
  db.query("select count(*) as amount from customers", (error, result) => {
    res.send(result);
  });
});

app.get("/api/get/completedCustomerOrdersCount", (req, res) => {
  db.query(
    "select count(*) as amount from customer_orders where completed = 1",
    (error, result) => {
      res.send(result);
    }
  );
});

app.get("/api/get/totalProducts", (req, res) => {
  db.query("select count(*) as amount from products", (error, result) => {
    res.send(result);
  });
});

app.get("/api/get/fiveClosestDeliveries", (req, res) => {
  db.query(
    "SELECT inventory_deliveries.id as id, inventory_deliveries.supplier as supplier, inventory_deliveries.datePlaced as datePlaced, date_format(inventory_deliveries.dateIncoming, '%m-%d-%y') as dateIncoming, inventory_deliveries.completed as completed FROM inventory_deliveries where inventory_deliveries.dateIncoming > current_date() and completed = 0 order by inventory_deliveries.dateIncoming asc limit 5",
    (error, result) => {
      res.send(result);
    }
  );
});

app.get("/api/get/test", (req, res) => {
  db.query(
    "select id, supplier, date_format(datePlaced, '%m-%d-%y') as datePlaced, date_format(dateIncoming, '%m-%d-%y') as dateIncoming from inventory_deliveries ",
    (error, result) => {
      res.send(result);
    }
  );
});

app.listen(3001, () => {});
