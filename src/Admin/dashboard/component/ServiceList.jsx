import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Typography, Pagination } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Icon } from "@mui/material";

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: 16,
    padding: 8, // Reduce padding to make the card smaller
    width: 50, // Adjust the width of the card
    height: 50, // Adjust the height of the card
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    margin: "auto", // Centers the card within the grid item
  },
  icon: {
    fontSize: 40, // Reduce icon size
    color: "#00bfa5", // Example icon color
  },
  cardContent: {
    padding: 0, // Optional: reduce the content padding if needed
  },
}));

const services = [
  { name: "Service 1    ", icon: "home" },
  { name: "Service 2", icon: "work" },
  { name: "Service 3", icon: "build" },
  { name: "Service 4", icon: "phone" },
  { name: "Service 5", icon: "star" },
  { name: "Service 6", icon: "school" },
  { name: "Service 7", icon: "flight" },
  { name: "Service 8", icon: "camera" },
  { name: "Service 6", icon: "school" },
  { name: "Service 7", icon: "flight" },
  { name: "Service 8", icon: "camera" },
  // Add more services as needed
];

export default function ServiceList({ Skeleton }) {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  // Pagination logic: slice the service list based on the current page
  const displayedServices = services.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Skeleton height={165} sx={{ padding: "3%" }}>
      <Typography style={{ marginBottom: "20px" }}>Service List</Typography>
      <Grid container spacing={3} sx={{justifyContent: "center"}}>
        {displayedServices.map((service, index) => (
          <Grid 
            item
            xs={12}
            sm={6}
            md={4}
            key={index}
          >
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                {/* <Icon className={classes.icon}>{service.icon}</Icon> */}
                <Typography sx={{fontSize:"10px", textAlign:"start",float: "left"}}>{service.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination Dots */}
      <Pagination
        count={Math.ceil(services.length / itemsPerPage)}
        page={page}
        onChange={handlePageChange}
        color="primary"
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
        size="small"
      />
    </Skeleton>
  );
}
