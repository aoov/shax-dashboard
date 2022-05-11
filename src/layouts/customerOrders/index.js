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

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import { useEffect, useState } from "react";
import Axios from "axios";

function CustomerOrders() {
  // eslint-disable-next-line no-unused-vars
  const [productsList, setProductsList] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [orderID, setOrderID] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/customerOrders").then((response) => {
      setProductsList(response.data);
    });
    Axios.get("http://localhost:3001/api/get/completedCustomerOrders").then((response) => {
      setCompleted(response.data);
    });
  }, []);

  const markCompleted = () => {
    Axios.post("http://localhost:3001/api/insert/markOrderCompleted", {
      orderID,
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
                  Uncompleted Customer Orders
                </MDTypography>
              </MDBox>
              <MDBox>
                <DataTable
                  table={{
                    columns: [
                      { Header: "id", accessor: "orderID", width: "10%" },
                      { Header: "customer id", accessor: "customerID", width: "25%" },
                      { Header: "placed", accessor: "datePlaced", width: "10%" },
                      { Header: "different products", accessor: "numberOfItems" },
                      { Header: "total items", accessor: "totalItems" },
                    ],
                    rows: productsList,
                  }}
                  isSorted
                  canSearch
                />
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
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Completed Customer Orders
                </MDTypography>
              </MDBox>
              <MDBox>
                <DataTable
                  table={{
                    columns: [
                      { Header: "id", accessor: "orderID", width: "10%" },
                      { Header: "customer id", accessor: "customerID", width: "25%" },
                      { Header: "placed", accessor: "datePlaced", width: "10%" },
                      { Header: "different products", accessor: "numberOfItems" },
                      { Header: "total items", accessor: "totalItems" },
                    ],
                    rows: completed,
                  }}
                  isSorted
                  canSearch
                />
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
                  Add Delivery Items
                </MDTypography>
              </MDBox>
              <MDBox p={4} pt={4} sx={{ width: "100%" }}>
                <Grid container>
                  <MDBox mb={3} sx={{ width: "55%" }}>
                    <MDInput
                      variant="outlined"
                      label="Order ID"
                      fullWidth
                      onChange={(event) => setOrderID(event.target.value)}
                    />
                  </MDBox>
                  <MDBox ml={3} mt={1 / 2} sx={{ width: "15%" }}>
                    <MDButton sx={{ width: "100%" }} onClick={markCompleted}>
                      Mark Completed
                    </MDButton>
                  </MDBox>
                  <MDBox ml={1} mt={1 / 2} sx={{ width: "15%" }}>
                    <MDButton sx={{ width: "100%" }}>Unmark Completed</MDButton>
                  </MDBox>
                  <MDBox mb={3} sx={{ width: "100%" }} />
                </Grid>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default CustomerOrders;
