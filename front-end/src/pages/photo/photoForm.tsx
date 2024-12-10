import React from "react";
import {
  Grid,
  Box,
  TextField,
  Typography,
  Button,
  FormControl,
  FormHelperText,
} from "@mui/material";

import ResponsiveAppBar from "../../components/appbar/appBar";
import { useNavigate } from "react-router-dom";
import { isMobile } from "react-device-detect";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import useCheckSmartphoneScreen from "../../components/mobileChecker/smartPhoneChecker";
import useCheckTabletScreen from "../../components/mobileChecker/tabletChecker";
import { createPhoto } from "../../services/photo";

export default function AddAlbum() {
  const [title, setTitle] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");
  const [thumbnailUrl, setThumbnailUrl] = React.useState<string | "">("");
  const { idAlbum } = useParams();

  const isSmartphone: any = useCheckSmartphoneScreen();
  const isTablet: any = useCheckTabletScreen();

  let navigate = useNavigate();

  function handleChangeTitle(event: any) {
    setTitle(event.target.value);
  }

  function handleChangeUrl(event: any) {
    setUrl(event.target.value);
  }

  function handleChangeThumbnailUrl(event: any) {
    setThumbnailUrl(event.target.value);
  }

  async function save() {
    if (!title) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "The 'Title' field is mandatory!",
      });

      return;
    }

    try {
      await createPhoto({
        title,
        idAlbum,
        url,
        thumbnailUrl,
      });

      Swal.fire({
        title: "Success!",
        text: `The photo was successfully created!`,
        icon: "success",
        showConfirmButton: false,
        position: "center",
        timer: 3000,
        width: 400,
      });

      navigate("/users");
    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    }
  }

  function cancel() {
    Swal.fire({
      title: "Are you sure you want do cancel?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#990000",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.value) {
        navigate("/users");
      } else if (result.dismiss) {
        return;
      }
    });
  }

  return (
    <div>
      <Box
        sx={{
          height: isSmartphone ? "110vh" : "100vh",
          backgroundColor: "#F8FAE5",
        }}
      >
        <ResponsiveAppBar></ResponsiveAppBar>
        <Box
          height={isMobile ? "10vh" : "5vh"}
          width={"98%"}
          sx={{
            marginLeft: "1%",
          }}
        >
          <Grid
            container
            sx={{
              height: "100%",
              marginTop: "3vh",
            }}
          >
            <Grid item xs={12} md={12} sm={12}>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Typography
                  sx={{ marginBottom: 2, fontSize: 40, color: "black" }}
                >
                  Add photo
                </Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={isTablet || isSmartphone ? 12 : 4}
                  md={isTablet || isSmartphone ? 12 : 4}
                  sm={isTablet || isSmartphone ? 12 : 4}
                >
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      aria-label="Title"
                      id="standard-nome"
                      label={"Title"}
                      variant="outlined"
                      color="success"
                      value={title}
                      onChange={handleChangeTitle}
                      sx={{
                        width: "100%",
                      }}
                    />

                    {title && (
                      <FormHelperText id="standard-nome">Title</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={isTablet || isSmartphone ? 12 : 4}
                  md={isTablet || isSmartphone ? 12 : 4}
                  sm={isTablet || isSmartphone ? 12 : 4}
                >
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      aria-label="url"
                      id="standard-nome"
                      label={"url"}
                      variant="outlined"
                      color="success"
                      value={url}
                      onChange={handleChangeUrl}
                      sx={{
                        width: "100%",
                      }}
                    />

                    {url && (
                      <FormHelperText id="standard-nome">url</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={isTablet || isSmartphone ? 12 : 4}
                  md={isTablet || isSmartphone ? 12 : 4}
                  sm={isTablet || isSmartphone ? 12 : 4}
                >
                  <FormControl sx={{ width: "100%" }}>
                    <TextField
                      aria-label="ThumbnailUrl"
                      id="standard-nome"
                      label={"ThumbnailUrl"}
                      variant="outlined"
                      color="success"
                      value={thumbnailUrl}
                      onChange={handleChangeThumbnailUrl}
                      sx={{
                        width: "100%",
                      }}
                    />

                    {thumbnailUrl && (
                      <FormHelperText id="standard-nome">
                        ThumbnailUrl
                      </FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ marginTop: "1vh" }}>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sm={6}
                  display="flex"
                  justifyContent="end"
                >
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      background: "#990000",
                      ":hover": {
                        background: "#990000",
                      },
                      width: isTablet || isSmartphone ? "20vw" : "9vw",
                    }}
                    onClick={() => cancel()}
                  >
                    Cancelar
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  sm={6}
                  display="flex"
                  justifyContent="flex-start"
                >
                  <Button
                    disabled={!title}
                    variant="contained"
                    color="primary"
                    sx={{
                      backgroundColor: "#1A4D2E",
                      ":hover": {
                        backgroundColor: "#1A4D2E",
                      },
                      width: isMobile ? "13.5vw" : "9vw",
                    }}
                    onClick={() => save()}
                  >
                    Salvar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}
