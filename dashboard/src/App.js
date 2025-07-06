import { useEffect } from "react";
import MainPage from "./pages/mainPage/MainPage";
import "./App.css";
import RegisterPage from "./pages/registerPage/RegisterPage";
import { Route, Routes } from "react-router-dom";
import AboutPage from "./pages/about/AboutPage";
import NotFoundPage from "./pages/notFound/NotFoundPage";
import DefaultLayout from "./components/layouts/DefaultLayout";
import UsersListPage from "./pages/admin/users/UsersListPage";
import EditUserPage from "./pages/admin/users/editUserPage/EditUserPage";
import LoginPage from "./pages/loginPage/LoginPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import AdminPanelLayout from "./components/layouts/AdminPanelLayout";
import RolesListPage from "./pages/admin/roles/RolesListPage";
import { useSelector } from "react-redux";
import usersJson from "./pages/admin/users/users.json";
import rolesJson from "./pages/admin/roles/roles.json";
import useAction from "./hooks/useAction";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./theming/themes";
import ManufacturesPage from "./pages/manufacturesPage/ManufacturesPage";
import CarsPage from "./pages/carsPage/CarsPage";

const App = () => {
        const { isAuth, user } = useSelector((state) => state.auth);
        const { theme } = useSelector((state) => state.theme);
        const { loginByToken, setTheme, refreshTokens } = useAction();

        function getAccessToken() {
            const cookie = document.cookie.split(';');
            for (const item of cookie) {
                const [key, value] = item.split('=');
                if (key === "at") {
                    return value;
                }
            }
            return null;
        }

        // user login
        useEffect(() => {
            const token = getAccessToken();
            if (token) {
                loginByToken(token);
            } else {
                refreshTokens();
            }

            // theme
            const localTheme = localStorage.getItem("theme");
            if (localTheme) {
                setTheme(localTheme);
            }
        }, []);

        return ( <
                ThemeProvider theme = { theme === "light" ? lightTheme : darkTheme } >
                <
                Routes >
                <
                Route path = "/"
                element = { < DefaultLayout / > } >
                <
                Route index element = { < MainPage / > }
                /> {
                    !isAuth ? ( <
                        >
                        <
                        Route path = "register"
                        element = { < RegisterPage / > }
                        /> <
                        Route path = "login"
                        element = { < LoginPage / > }
                        /> <
                        />
                    ) : ( <
                        Route path = "profile"
                        element = { < ProfilePage / > }
                        />
                    )
                } <
                Route path = "manufactures"
                element = { < ManufacturesPage / > }
                /> <
                Route path = "cars"
                element = { < CarsPage / > }
                /> <
                Route path = "about"
                element = { < AboutPage / > }
                /> <
                Route path = "*"
                element = { < NotFoundPage / > }
                /> <
                /Route> {
                    isAuth && user.role.includes("admin") && ( <
                        Route path = "admin"
                        element = { < AdminPanelLayout / > } >
                        <
                        Route path = "users" >
                        <
                        Route index element = { < UsersListPage / > }
                        /> <
                        Route path = "user"
                        element = { < EditUserPage isEdit = { false }
                            />} /
                            >
                            <
                            Route
                            path = "user/:id"
                            element = { < EditUserPage isEdit = { true }
                                />} /
                                >
                                <
                                /Route> <
                                Route path = "roles"
                                element = { < RolesListPage / > }
                                /> <
                                /Route>
                            )
                        } <
                        /Routes> <
                        /ThemeProvider>
                    );
                };

                export default App;