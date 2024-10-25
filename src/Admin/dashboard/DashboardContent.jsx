import React from "react";
import Grid from "@mui/material/Grid2";
import UsersChart from "./component/UsersChart";
import ServiceRequestChart from "./component/ServiceRequestChart";
import ServiceList from "./component/ServiceList";

export default function DashboardComponent({ Skeleton }) {
  return (
    <>
      <Grid container spacing={1}>
        <UsersChart Skeleton={Skeleton} />
        <Grid size={4}>
          <ServiceRequestChart Skeleton={Skeleton} />
          <ServiceList Skeleton={Skeleton} />
        </Grid>
        <Grid size={4.5}>
          <Skeleton height={400}></Skeleton>
        </Grid>
        <Grid size={7.5}>
          <Skeleton height={400} />
        </Grid>
      </Grid>
    </>
  );
}
