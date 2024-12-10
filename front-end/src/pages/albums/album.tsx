import React, { useEffect } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

import ResponsiveAppBar from "../../components/appbar/appBar";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { getAllAlbums, getAlbumFromUserId } from "../../services/album";
import GenericTable from "../../components/genericTable/genericTable";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCheckSmartphoneScreen from "../../components/mobileChecker/smartPhoneChecker";
import useCheckTabletScreen from "../../components/mobileChecker/tabletChecker";

function AlbumList() {
  const [albumsToPopulateTable, setUsersToPopulateTable] = React.useState<
    Array<Record<string, string>>
  >([]);
  const { id } = useParams();

  let navigate = useNavigate();
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
  }, [id]);

  function onClickEdit(element: any) {
    navigate(`/user/edit/${element.id}`);
  }

  function getAlbumTableHeader() {
    return [
      {
        width: 10,
        label: "Name",
        dataKey: "name",
      },
      {
        width: 10,
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
                onClickEdit={(el: any) => onClickEdit(el)}
              ></GenericTable>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default AlbumList;
