import React, { useState } from "react";
import Grid from "@mui/material/Grid2";
import { Card, CardContent, Typography, Pagination, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Icon } from "@mui/material";

const useStyles = makeStyles(() => ({
  card: {
    borderRadius: 16,
    width: 60, // Adjust the width of the card
    height: 60, // Adjust the height of the card
    padding: 0,
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    alignContent: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));


export default function ServiceList({ Skeleton, services }) {
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
        {services.length === 0 ?(
          <Typography variant="body1" sx={{ padding: 2 }}>
            There are no services.
          </Typography>
        ) : (displayedServices.map((service, index) => (
          <Grid 
            key={index}

          >
            <Card className={classes.card}>
            <CardMedia
                        component="img"
                        src={"http://localhost/FIXR/API/Images/"+service.image}
                        alt={service.name}
                        style={{ width: 30, height: 30}}
                      />
                      <Typography sx={{fontSize:"11px", textAlign:"center", marginTop: "4%"}}>{service.CategoryName}</Typography>
            </Card>
          </Grid>
        )
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
