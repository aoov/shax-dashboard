/**
 =========================================================
 * Material Dashboard 2 React - v2.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/material-dashboard-react
 * Copyright 2022 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import MDAlert from "components/MDAlert";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useState } from "react";
import Axios from "axios";

function AddOrder() {
  const [alerts1, setAlerts1] = useState([]);
  const [alerts2, setAlerts2] = useState([]);
  const [customerID, setCustomerID] = useState("");
  const [orderID, setOrderID] = useState("");
  const [productID, setProductID] = useState("");
  const [quantity, setQuantity] = useState("");
  const [cost, setCost] = useState("");

  const getOrderID = () => {
    Axios.get("http://localhost:3001/api/get/orderID").then((response) => {
      const temp = (
        <MDAlert key={alerts1.length} color="success" dismissible sx={{ width: "50%" }}>
          Order Added to System, ID: {response.data[0].last_id}
        </MDAlert>
      );
      setAlerts1((oldArray) => [oldArray, temp]);
    });
  };

  const addOrder = () => {
    Axios.post("http://localhost:3001/api/insert/order", {
      customerID,
    }).then(() => getOrderID());
  };

  const submitOrderItem = () => {
    Axios.post("http://localhost:3001/api/insert/orderItem", {
      orderID,
      productID,
      quantity,
      cost,
    }).then(() => {
      const temp = (
        <MDAlert key={alerts2.length} color="success" dismissible sx={{ width: "50%" }}>
          Item Added to Order
        </MDAlert>
      );
      setAlerts2((oldArray) => [oldArray, temp]);
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Add Order
                </MDTypography>
              </MDBox>
              <MDBox p={4} pt={3} sx={{ width: "100%" }}>
                <MDBox mb={3} sx={{ width: "50%" }}>
                  <MDInput
                    variant="outlined"
                    label="Customer ID"
                    fullWidth
                    onChange={(event) => setCustomerID(event.target.value)}
                  />
                </MDBox>
                <MDBox mb={3} sx={{ width: "100%" }}>
                  <MDButton sx={{ width: "50%" }} onClick={addOrder}>
                    Submit
                  </MDButton>
                </MDBox>
                <MDBox mb={3} sx={{ width: "100%" }}>
                  {alerts1}
                </MDBox>
              </MDBox>
            </Card>
            <MDBox p={3} />
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="secondary"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Add Order Items
                </MDTypography>
              </MDBox>
              <MDBox p={4} pt={4} sx={{ width: "100%" }}>
                <Grid container>
                  <MDBox mb={3} sx={{ width: "15%" }}>
                    <MDInput
                      variant="outlined"
                      label="Order ID"
                      fullWidth
                      onChange={(event) => setOrderID(event.target.value)}
                    />
                  </MDBox>
                  <MDBox ml={3} mb={3} sx={{ width: "15%" }}>
                    <MDInput
                      variant="outlined"
                      label="Product ID"
                      fullWidth
                      onChange={(event) => setProductID(event.target.value)}
                    />
                  </MDBox>
                  <MDBox ml={3} mb={3} sx={{ width: "15%" }}>
                    <MDInput
                      variant="outlined"
                      label="Quantity"
                      fullWidth
                      onChange={(event) => setQuantity(event.target.value)}
                    />
                  </MDBox>
                  <MDBox ml={3} mb={3} sx={{ width: "15%" }}>
                    <MDInput
                      variant="outlined"
                      label="Cost"
                      fullWidth
                      onChange={(event) => setCost(event.target.value)}
                    />
                  </MDBox>
                  <MDBox ml={3} mt={1 / 2} sx={{ width: "25%" }}>
                    <MDButton onClick={submitOrderItem} sx={{ width: "50%" }}>
                      Submit
                    </MDButton>
                  </MDBox>
                  <MDBox mb={3} sx={{ width: "100%" }}>
                    {alerts2}
                  </MDBox>
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AddOrder;
