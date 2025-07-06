import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import Grid from "@mui/material/Grid2";
import {Outlet} from "react-router-dom";
import AdminPanelMenu from "../menu/AdminPanelMenu";
import {useSelector} from "react-redux";
import {Box, CircularProgress} from "@mui/material";

const AdminPanelLayout = () => {
    const {isLoading} = useSelector((state) => state.common);

    return (
        <>
            <Navbar/>
            <Grid container spacing={2} sx={{minHeight: "100vh", my: "10px"}}>
                <Grid size={2}>
                    <AdminPanelMenu/>
                </Grid>
                <Grid size={8}>
                    {
                        isLoading ? (
                            <Box display="flex" justifyContent="center" margin={5}>
                                <CircularProgress size="5rem"/>
                            </Box>
                        ) : (
                            <Outlet/>
                        )
                    }
                </Grid>
                <Grid size={2}></Grid>
            </Grid>
            <Footer/>
        </>
    )
}

export default AdminPanelLayout;