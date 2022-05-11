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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

import { useState, useEffect } from "react";
import Axios from "axios";

function OrdersOverview() {
  const [nearest, setNearest] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/fiveClosestDeliveries").then((response) => {
      setNearest(response.data);
    });
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Nearest Inventory Arrivals
        </MDTypography>
        <MDBox mt={0} mb={2} />
      </MDBox>
      <MDBox p={2}>
        {nearest.map((delivery) => (
          <TimelineItem
            key={delivery.id}
            color="success"
            icon="notifications"
            dateTime={delivery.dateIncoming}
            title={delivery.supplier}
          />
        ))}
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
