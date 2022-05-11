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
import { useState, useEffect } from "react";
import Axios from "axios";
import DataTable from "examples/Tables/DataTable";

function Customers() {
  const [alerts1, setAlerts1] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerList, setCustomerList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/customers").then((response) => {
      setCustomerList(response.data);
    });
  }, []);

  const getCustomerID = () => {
    Axios.get("http://localhost:3001/api/get/customerID").then((response) => {
      const temp = (
        <MDAlert key={alerts1.length} color="success" dismissible sx={{ width: "50%" }}>
          Customer Added to System, ID: {response.data[0].last_id}
        </MDAlert>
      );
      setAlerts1((oldArray) => [oldArray, temp]);
    });
  };

  const addCustomer = () => {
    Axios.post("http://localhost:3001/api/insert/customer", {
      customerName,
      customerAddress,
    }).then(() => getCustomerID());
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
                  Add Customer
                </MDTypography>
              </MDBox>
              <MDBox p={4} pt={3} sx={{ width: "100%" }}>
                <MDBox mb={3} sx={{ width: "50%" }}>
                  <MDInput
                    variant="outlined"
                    label="Customer Name"
                    fullWidth
                    onChange={(event) => setCustomerName(event.target.value)}
                  />
                </MDBox>
                <MDBox mb={3} sx={{ width: "50%" }}>
                  <MDInput
                    variant="outlined"
                    label="Customer Address"
                    fullWidth
                    onChange={(event) => setCustomerAddress(event.target.value)}
                  />
                </MDBox>
                <MDBox mb={3} sx={{ width: "100%" }}>
                  <MDButton sx={{ width: "50%" }} onClick={addCustomer}>
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
                  Customers List
                </MDTypography>
              </MDBox>
              <MDBox>
                <DataTable
                  table={{
                    columns: [
                      { Header: "Customer ID", accessor: "id", width: "15%" },
                      { Header: "name", accessor: "name", width: "15%" },
                      { Header: "Address", accessor: "address", width: "30%" },
                    ],
                    rows: customerList,
                  }}
                  isSorted
                  canSearch
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Customers;
