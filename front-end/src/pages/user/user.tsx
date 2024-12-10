import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";

import ResponsiveAppBar from "../../components/appbar/appBar";
import Groups2Icon from "@mui/icons-material/Groups2";
import { getAllUsers } from "../../services/user";
import GenericTable from "../../components/genericTable/genericTable";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useCheckSmartphoneScreen from "../../components/mobileChecker/smartPhoneChecker";
import useCheckTabletScreen from "../../components/mobileChecker/tabletChecker";

function UserList() {
  const [usersToPopulateTable, setUsersToPopulateTable] = React.useState<
    Array<Record<string, string>>
  >([]);

  let navigate = useNavigate();
  const isSmartphone: any = useCheckSmartphoneScreen();
  const isTablet: any = useCheckTabletScreen();

  useEffect(() => {
    async function getCollectStatusForDashboard() {
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

      setUsersToPopulateTable(result);
    }

    getCollectStatusForDashboard();
  }, []);

  function onClickViewData(element: any) {
    navigate(`/albums/${element.id}`);
  }

  function getUsersTableHeader() {
    return [
      {
        width: 5,
        label: "ID",
        dataKey: "id",
      },
      {
        width: 30,
        label: "Nome",
        dataKey: "name",
      },
      {
        width: 10,
        label: "Email",
        dataKey: "email",
      },
    ];
  }

  return (
    <div>
      <Box sx={{ height: "100vh", backgroundColor: "#F8FAE5" }}>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Box
          height={isSmartphone || isTablet ? "85%" : "90%"}
          width={"98vw"}
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
                  My users
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={5} md={5} sm={5}>
              <Box
                sx={{
                  marginTop: "4vh",
                  width: "100%",
                }}
                display="flex"
                justifyContent="flex-start"
              >
                <Groups2Icon
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
                rows={usersToPopulateTable}
                columns={getUsersTableHeader()}
                canDelet={false}
                viewDataLabel="View albums"
                canViewData={true}
                onClickViewData={(el: any) => onClickViewData(el)}
              ></GenericTable>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </div>
  );
}

export default UserList;
