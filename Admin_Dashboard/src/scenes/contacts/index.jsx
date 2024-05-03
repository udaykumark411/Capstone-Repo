import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
// import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";  


const url = "http://localhost:8000";

const Contacts = () => {
  const theme = useTheme();

  const [usersData, setUsersData] = useState([]);
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    // Fetch users data from backend
    axios.get(`${url}/users`)
    .then(response => {
      // Add unique id to each user
      const usersWithId = response.data.map((user, index) => ({
        ...user,
        id: index + 1, // Generate id using index (starting from 1)
      }));
      setUsersData(usersWithId);
      console.log('Users data:', usersWithId); // Log fetched data with id
    })
      .catch(error => {
        console.error('Error fetching users data:', error);
      });
  }, []);

  const columns = [
    { field: "_id", headerName: "S.no", flex: 0.5 },
    { field: "firstname", headerName: "First Name", flex: 1 },
    { field: "lastname", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="Users"
        subtitle="List of Users"
      />
      <Box
       m="40px 0 0 0"
       height="75vh"
       sx={{
         "& .MuiDataGrid-root": {
           border: "none",
         },
         "& .MuiDataGrid-cell": {
           borderBottom: "none",
         },
         "& .name-column--cell": {
           color: colors.greenAccent[300],
         },
         "& .MuiDataGrid-columnHeaders": {
           backgroundColor: colors.blueAccent[700],
           borderBottom: "none",
         },
         "& .MuiDataGrid-virtualScroller": {
           backgroundColor: colors.primary[400],
         },
         "& .MuiDataGrid-footerContainer": {
           borderTop: "none",
           backgroundColor: colors.blueAccent[700],
         },
         "& .MuiCheckbox-root": {
           color: `${colors.greenAccent[200]} !important`,
         },
       }}
      >
        <DataGrid
          rows={usersData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
