import React, { useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";

import ResponsiveAppBar from "../../components/appbar/appBar";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import {
  getAllAlbums,
  getAlbumFromUserId,
  deleteAlbum,
} from "../../services/album";
import GenericTable from "../../components/genericTable/genericTable";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import useCheckSmartphoneScreen from "../../components/mobileChecker/smartPhoneChecker";
import useCheckTabletScreen from "../../components/mobileChecker/tabletChecker";

function AlbumList() {
  const [albumsToPopulateTable, setUsersToPopulateTable] = React.useState<
    UserAPIResponse | undefined | Array<Object>
  >([]);
  const [update, setUpdate] = React.useState<boolean>(true);
  const { id } = useParams();

  let navigate = useNavigate();
  let user: any = JSON.parse(localStorage.getItem("user") || "{}");
  const isSmartphone: any = useCheckSmartphoneScreen();
  const isTablet: any = useCheckTabletScreen();

  useEffect(() => {
    async function getCollectStatusForDashboard() {
      let result;

      try {
        if (id) {
          result = await getAlbumFromUserId({ id });
        } else {
          result = await getAllAlbums();
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }

      setUsersToPopulateTable(result);
    }

    getCollectStatusForDashboard();
  }, [id, update]);

  function onClickEdit(element: UserAlbum) {
    if (element.id_user !== user.id) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You can only edit your own albums :(",
      });
    }
  }

  function onClickViewData(element: UserAlbum) {
    navigate(`/photo/${element.id}/${element.id_user === user.id}`);
  }

  function onClickDelete(element: UserAlbum) {
    console.log(element);

    if (element.id_user !== user.id) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "You can only delete your own albums :(",
      });
    } else {
      Swal.fire({
        title: "Are you sure that you want to delete this album?",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
        confirmButtonColor: "#990000",
        showCancelButton: true,
      }).then(async (result) => {
        if (result.value) {
          try {
            await deleteAlbum({
              id: element.id.toString(),
            });

            await Swal.fire({
              title: "Success!",
              text: `Success to delete the album!`,
              icon: "success",
              showConfirmButton: false,
              position: "center",
              timer: 3000,
              width: 400,
            });

            setUpdate(!update);
          } catch (err: any) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.message,
            });
          }
        } else if (result.dismiss) {
          return;
        }
      });
    }
  }

  function getAlbumTableHeader() {
    return [
      {
        width: 10,
        label: "Name",
        dataKey: "name",
      },
      {
        width: 30,
        label: "Email",
        dataKey: "email",
      },
      {
        width: 10,
        label: "Title",
        dataKey: "title",
      },
    ];
  }

  return (
    <div>
      <Box sx={{ height: "100vh", backgroundColor: "#F8FAE5" }}>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Box
          height={isSmartphone || isTablet ? "85%" : "40vh"}
          width={"100vw"}
          sx={{
            marginLeft: isSmartphone || isTablet ? "1%" : "1%",
          }}
        >
          <Grid container>
            <Grid item xs={7} md={7} sm={7}>
              <Box
                sx={{
                  marginTop: "3vh",
                  marginLeft: isTablet || isSmartphone ? "" : "-5vw",
                  width: "95%",
                }}
                display="flex"
                justifyContent="flex-end"
              >
                <Typography
                  sx={{
                    fontWeight: "10vw",
                    letterSpacing: ".3rem",
                    fontSize: "2rem",
                    textDecoration: "none",
                    color: "Black",
                  }}
                >
                  Albums
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5} md={5} sm={5}>
              <Box
                sx={{
                  marginTop: "5vh",
                  width: "100%",
                }}
                display="flex"
                justifyContent="flex-start"
              >
                <LocalLibraryIcon
                  sx={{
                    marginLeft: isTablet || isSmartphone ? "10vw" : "",
                    transform: "scale(3.5)",
                    color: "#3C3633",
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} sm={12}>
              <Box
                sx={{
                  marginTop: "4vh",
                  width: "95%",
                }}
                display="flex"
                justifyContent="flex-end"
              >
                <Button
                  sx={{
                    backgroundColor: "#F8FAE5",
                    border: 1,
                    ":hover": {
                      borderColor: "black",
                    },
                    color: "#3C3633",
                    borderRadius: "3px",
                  }}
                  startIcon={<AddIcon />}
                  onClick={() => navigate("/albums/add")}
                >
                  Add album
                </Button>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              sx={{ height: "65vh", marginTop: "4vh" }}
            >
              <GenericTable
                rows={albumsToPopulateTable}
                columns={getAlbumTableHeader()}
                canEdit={true}
                canViewData={true}
                canDelet={true}
                viewDataLabel="View photos"
                onClickViewData={(el: any) => onClickViewData(el)}
                onClickEdit={(el: any) => onClickEdit(el)}
                onClickDelete={(el: any) => onClickDelete(el)}
              ></GenericTable>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default AlbumList;
