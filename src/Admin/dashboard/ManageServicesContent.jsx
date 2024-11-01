import React, { useState } from "react";
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

export default function ManageServicesContent({ Skeleton }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [view, setView] = useState("list");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
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

  const services = [
    {
      name: "Service 1",
      description: "Description 1",
      image:
        "https://cdn.iconscout.com/icon/free/png-512/free-instagram-logo-icon-download-in-svg-png-gif-file-formats--business-social-post-logos-icons-1646407.png?f=webp&w=256",
    },
    {
      name: "Service 2",
      description: "Description 2",
      image:
        "https://cdn.iconscout.com/icon/free/png-512/free-instagram-logo-icon-download-in-svg-png-gif-file-formats--business-social-post-logos-icons-1646407.png?f=webp&w=256",
    },
    {
      name: "Service 3",
      description: "Description 3",
      image:
        "https://cdn.iconscout.com/icon/free/png-512/free-instagram-logo-icon-download-in-svg-png-gif-file-formats--business-social-post-logos-icons-1646407.png?f=webp&w=256",
    },
    {
      name: "Service 4",
      description: "Description 4",
      image:
        "https://cdn.iconscout.com/icon/free/png-512/free-instagram-logo-icon-download-in-svg-png-gif-file-formats--business-social-post-logos-icons-1646407.png?f=webp&w=256",
    },
    {
      name: "Service 5",
      description: "Description 5",
      image:
        "https://cdn.iconscout.com/icon/free/png-512/free-instagram-logo-icon-download-in-svg-png-gif-file-formats--business-social-post-logos-icons-1646407.png?f=webp&w=256",
    },
  ];

  const paginatedServices = services.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Grid container spacing={1}>
        <Grid item size={7}>
          <Skeleton height={500} sx={{ padding: "3%" }}>
            <Typography>Add New Service</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
              }}
            >
              <Card sx={{ border: "none", alignContent: "center" }}>
                <Box
                  sx={{
                    width: "100%",
                    height: 140,
                    border: "2px dashed grey",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 2,
                  }}
                >
                  {selectedImage && (
                    <CardMedia
                      component="img"
                      image={selectedImage}
                      alt="Selected Image"
                      sx={{ width: "100%", height: "100%" }}
                    />
                  )}
                </Box>
                <Button variant="contained" component="label">
                  Upload File
                  <input type="file" hidden onChange={handleImageChange} />
                </Button>
              </Card>
            </Box>
            <Box
              component="form"
              autoComplete="off"
              sx={{ "& .MuiTextField-root": { m: 1, width: "42ch" } }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  height: "100%",
                  marginTop: "4%",
                }}
              >
                <Stack
                  direction="column"
                  spacing={1}
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "start",
                  }}
                >
                  <TextField label={"Service Name"} />
                  <TextField label="Description" multiline rows={4} />
                </Stack>
                <Button variant="contained" sx={{ mb: 1 }}>
                  Submit
                </Button>
              </Box>
            </Box>
          </Skeleton>
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
                              src={service.image}
                              alt={service.name}
                              style={{ width: 50, height: 50 }}
                            />
                          </TableCell>
                          <TableCell>{service.name}</TableCell>
                          <TableCell>{service.description}</TableCell>
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
                  }}
                >
                  {paginatedServices.map((service, index) => (
                    <Card key={index} sx={{ width: "30%" }}>
                      <CardMedia
                        component="img"
                        height="100"
                        width="50"
                        image={service.image}
                        alt={service.name}
                      />
                      <CardContent>
                        <Typography variant="h6">{service.name}</Typography>
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
          </Skeleton>
        </Grid>
      </Grid>
    </>
  );
}
