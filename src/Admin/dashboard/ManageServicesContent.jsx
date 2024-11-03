import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Stack,
  TextField,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import AddService from "./component/AddService";
import axios from "axios";
export default function ManageServicesContent({ Skeleton, services, setServiceChange }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [view, setView] = useState("list");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);


  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      console.log(event.target.files[0]);
    }
  };

  const toggleView = () => {
    setView((prevView) => (prevView === "list" ? "grid" : "list"));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedImage) return; 
    const formData = new FormData();
    formData.append("image", event.target.image.files[0]);
    formData.append("name", event.target.service.value);
    formData.append("description", event.target.description.value);
    try {
        axios.post("http://localhost/FIXR/API/admin/addService.php", formData).then((response) => {
        setServiceChange((prev) => !prev);
        });    
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

  const paginatedServices = services.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Grid container spacing={1}>
        <Grid item size={7}>
        <AddService Skeleton={Skeleton} selectedImage={selectedImage} handleImageChange={handleImageChange} handleSubmit={handleSubmit} />
        </Grid>
        <Grid item size={5}>
        <Skeleton height={500}>
  <Box
    sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 2,
    }}
  >
    <Typography variant="h6">Services</Typography>
    <IconButton onClick={toggleView}>
      {view === "list" ? <ViewModuleIcon /> : <ViewListIcon />}
    </IconButton>
  </Box>
  {services.length === 0 ? (
    <Typography variant="body1" sx={{ padding: 2 }}>
      There are no services.
    </Typography>
  ) : (
    <>
      {view === "list" ? (
        <>
          <TableContainer component={Paper} sx={{ height: "380px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Service Name</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedServices.map((service, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={"http://localhost/FIXR/API/Images/"+service.image}
                        alt={service.name}
                        style={{ width: 50, height: 40 }}
                      />
                    </TableCell>
                    <TableCell>{service.CategoryName}</TableCell>
                    <TableCell>{service.Description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={services.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage=""
          />
        </>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              padding: 2,
              height: 380,
              alignItems: "flex-start" 
            }}
          >
            {paginatedServices.map((service, index) => (
              <Card key={index} sx={{ width: "30%"}}>
                <CardMedia
                  component="img"
                  height="100"
                  width="50"
                  src={"http://localhost/FIXR/API/Images/"+service.image}
                  alt={service.name}
                />
                <CardContent>
                  <Typography variant="h6">{service.CategoryName}</Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
          <TablePagination
            rowsPerPageOptions={[]}
            component="div"
            count={services.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            labelRowsPerPage=""
          />
        </>
      )}
    </>
  )}
</Skeleton>
        </Grid>
      </Grid>
    </>
  );
}
