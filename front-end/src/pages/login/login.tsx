import React, { useEffect } from "react";
import {
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Typography,
  Box,
  MenuItem,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../services/user";
import backgroundImage from "../../assets/img/album_casamento.png";
import backgroundImageOverlap from "../../assets/img/album_fotos.jpg";
import { isMobile } from "react-device-detect";
import Swal from "sweetalert2";

function Login() {
  let [user, setUser] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [usersOptions, setUsersOptions] = React.useState<Array<Object>>([]);

  let navigate = useNavigate();

  useEffect(() => {
    async function getAllUsersToPopulate() {
      let result = [];

      try {
        result = await getAllUsers();
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }

      setUsersOptions(result);
    }

    getAllUsersToPopulate();
  }, []);

  const handleChangeUserSelected = (event: any) => {
    setEmail(event.target.value);
  };

  async function onSubmit() {
    if (!email) {
      return;
    }

    try {
      //   user = await login(email, password);

      navigate("/home");
      setUser(user);
    } catch (error: any) {
      if (error.status === 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }
    }
  }

  return (
    <div
      style={{
        width: "100vw",
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          opacity: 0.6,
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "100vh",
        }}
      ></Box>
      <Box
        width={isMobile ? "70vw" : "35vw"}
        height={"60vh"}
        sx={{
          boxShadow: 20,
          borderRadius: "25px",
          position: "absolute",
          top: isMobile ? "10vh" : "6vh",
          left: isMobile ? "17vw" : "33vw",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            height: "70%",
          }}
        >
          <Grid item xs={12}>
            <Box
              sx={{
                position: "relative",
                borderTopLeftRadius: "25px",
                borderTopRightRadius: "25px",
                height: "100%",
                background: `url(${backgroundImageOverlap})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></Box>
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          sx={{
            height: "50vh",
          }}
        >
          <Grid item xs={12}>
            <Box
              sx={{
                position: "relative",
                backgroundColor: "white",
                height: "100%",
                borderBottomLeftRadius: "25px",
                borderBottomRightRadius: "25px",
              }}
            >
              <Grid container>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Box
                    display={"flex"}
                    justifyContent="center"
                    sx={{
                      width: "80vw",
                      height: "20vh",
                    }}
                  >
                    <Typography
                      sx={{
                        marginTop: "5vh",
                        color: "rgb(26, 77, 46)",
                        fontWeight: "bold",
                        fontSize: "0.9em",
                      }}
                    >
                      Olá! Selecione o e-mail que você deseja fazer login!
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={12} sm={12}>
                  <Box display="flex" justifyContent="center">
                    <FormControl variant="outlined" sx={{ width: "20vw" }}>
                      <InputLabel id="teste" color="success">
                        Usuário
                      </InputLabel>
                      <Select
                        required
                        labelId="teste"
                        input={<OutlinedInput label="Usuário" />}
                        color="success"
                        onChange={handleChangeUserSelected}
                        sx={{ width: "20vw" }}
                      >
                        {usersOptions.map((item: any, index: number) => {
                          return (
                            <MenuItem value={item.id} key={`item-${index}`}>
                              {item.email}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={12}
                  sm={12}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={onSubmit}
                    sx={{
                      width: "85%",
                      borderRadius: 28,
                      padding: "10px 26px",
                      marginTop: "8vh",
                      fontSize: "14px",
                      backgroundColor: "#1A4D2E",
                      ":hover": {
                        backgroundColor: "#1A4D2E",
                      },
                    }}
                  >
                    Entrar
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Login;
