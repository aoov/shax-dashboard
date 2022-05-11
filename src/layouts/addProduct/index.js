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

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [MSRP, setMSRP] = useState("");
  const [description, setDescription] = useState("");
  const [alerts1, setAlerts1] = useState([]);

  const getProductID = () => {
    Axios.get("http://localhost:3001/api/get/productID").then((response) => {
      const temp = (
        <MDAlert key={alerts1.length} color="success" dismissible sx={{ width: "50%" }}>
          Product Added to System, ID: {response.data[0].last_id}
        </MDAlert>
      );
      setAlerts1((oldArray) => [oldArray, temp]);
    });
  };

  const addProduct = () => {
    Axios.post("http://localhost:3001/api/insert/product", {
      productName,
      manufacturer,
      MSRP,
      description,
    }).then(() => getProductID());
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
                  Add Product
                </MDTypography>
              </MDBox>
              <MDBox p={4} pt={3} sx={{ width: "100%" }}>
                <MDBox mb={3} sx={{ width: "50%" }}>
                  <MDInput
                    variant="outlined"
                    label="Product Name"
                    fullWidth
                    onChange={(event) => setProductName(event.target.value)}
                  />
                </MDBox>
                <MDBox mb={3} sx={{ width: "50%" }}>
                  <MDInput
                    variant="outlined"
                    label="Manufacturer Name"
                    fullWidth
                    onChange={(event) => setManufacturer(event.target.value)}
                  />
                </MDBox>
                <MDBox mb={3} sx={{ width: "50%" }}>
                  <MDInput
                    variant="outlined"
                    label="MSRP"
                    fullWidth
                    onChange={(event) => setMSRP(event.target.value)}
                  />
                </MDBox>
                <MDBox mb={3} sx={{ width: "50%" }}>
                  <MDInput
                    variant="outlined"
                    label="Product Description"
                    m={3}
                    multiline
                    rows={3}
                    sx={{ width: "100%" }}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                </MDBox>
                <MDBox mb={3} sx={{ width: "100%" }}>
                  <MDButton sx={{ width: "50%" }} onClick={addProduct}>
                    Submit
                  </MDButton>
                </MDBox>
                <MDBox mb={3} sx={{ width: "100%" }}>
                  {alerts1}
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default AddProduct;
