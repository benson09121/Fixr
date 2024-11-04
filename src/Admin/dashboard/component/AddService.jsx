import React from "react";
import Grid from "@mui/material/Grid2";
import {
  Box,
  Stack,
  TextField,
  Button,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";

export default function AddService( {Skeleton, selectedImage, handleImageChange, handleSubmit} ) {
    return (
<Skeleton height={500} sx={{ padding: "3%" }}>
            <Typography>Add New Service</Typography>
            <Box
            component={"form"}
            onSubmit={handleSubmit}
            >
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
                  <input type="file" name="image" accept="image/*" hidden onChange={handleImageChange} />
                </Button>
              </Card>
            </Box>
            <Box
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
                  <TextField name="service" label={"Service Name"} />
                  <TextField name="description" label="Description" multiline rows={4} />
                </Stack>
                <Button type="submit" variant="contained" sx={{ mb: 1 }}>
                  Submit
                </Button>   
              </Box>   
            </Box>
            </Box>
          </Skeleton>

    );
};