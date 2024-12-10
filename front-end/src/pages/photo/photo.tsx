import React, { useEffect } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";

import ResponsiveAppBar from "../../components/appbar/appBar";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import GenericTable from "../../components/genericTable/genericTable";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { deleteAPhotoFromAlbum } from "../../services/photo";
import useCheckSmartphoneScreen from "../../components/mobileChecker/smartPhoneChecker";
import useCheckTabletScreen from "../../components/mobileChecker/tabletChecker";
import { getPhotosFromAlbumId } from "../../services/photo";

function PhotoList() {
  const [photosToPopulateTable, setPhotosToPopulateTable] = React.useState<
    UserAPIResponse | undefined | Array<Object>
  >([]);
  const [update, setUpdate] = React.useState<boolean>(true);
  const { idAlbum, isUserVieweingYourOwnAlbum } = useParams();

  let navigate = useNavigate();
  const isSmartphone: any = useCheckSmartphoneScreen();
  const isTablet: any = useCheckTabletScreen();

  useEffect(() => {
    async function getPhotosForPopulateList() {
      let result: PhotoAPIResponse[] = [];

      try {
        if (idAlbum) {
          result = await getPhotosFromAlbumId({ idAlbum });
        }
      } catch (error: any) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      }

      setPhotosToPopulateTable(result);
    }

    getPhotosForPopulateList();
  }, [update]);

  function onClickDelete(element: PhotoAPIResponse) {
    Swal.fire({
      title: "Are you sure that you want to delete this photo?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      confirmButtonColor: "#990000",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.value) {
        try {
          await deleteAPhotoFromAlbum({
            idAlbum: element.id_album,
            url: element.url,
          });

          setUpdate(!update);

          await Swal.fire({
            title: "Success!",
            text: `Success to delete the photo!`,
            icon: "success",
            showConfirmButton: false,
            position: "center",
            timer: 3000,
            width: 400,
          });
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

  function getPhotoTableHeader() {
    return [
      {
        width: 10,
        label: "Album ID",
        dataKey: "id_album",
      },
      {
        width: 45,
        label: "Title",
        dataKey: "title",
      },
      {
        width: 45,
        label: "Url",
        dataKey: "url",
      },
      {
        width: 45,
        label: "ThumbnailUrl",
        dataKey: "thumbnail_url",
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
                  My photos
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
            {isUserVieweingYourOwnAlbum === "true" && (
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
                    onClick={() => navigate(`/photo/${idAlbum}/add`)}
                  >
                    Add photo
                  </Button>
                </Box>
              </Grid>
            )}
            <Grid
              item
              xs={12}
              md={12}
              sm={12}
              sx={{ height: "65vh", marginTop: "4vh" }}
            >
              <GenericTable
                rows={photosToPopulateTable}
                columns={getPhotoTableHeader()}
                canEdit={false}
                canViewData={false}
                canDelet={isUserVieweingYourOwnAlbum === "true" ? true : false}
                onClickDelete={(el: any) => onClickDelete(el)}
              ></GenericTable>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default PhotoList;
