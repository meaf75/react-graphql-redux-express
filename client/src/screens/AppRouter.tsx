import { Link, Route, Router } from "react-router-dom";
import { createBrowserHistory } from 'history'
import { RegisterScreen } from "./auth/RegisterScreen";
import { BackgroundContainer } from "../components/atoms/BackgroundContainer";
import { LoginScreen } from "./auth/LoginScreen";
import { HomeScreen } from "./home/HomeScreen";
import useConfigureStart from "../hooks/useConfigureStart";

const newHistory = createBrowserHistory();

export const AppRouter = () => {

    const dataLoaded = useConfigureStart();

    if (!dataLoaded) // Do nothing while loading
        return null;

    const content = dataLoaded ? (
        <Router history={newHistory}>
            <Link to="/"></Link>
            <Route path="/" exact component={LoginScreen} />
            <Route path="/login" exact component={LoginScreen} />
            <Route path="/register" exact component={RegisterScreen} />
            <Route path="/home" exact component={HomeScreen} />
        </Router>
    ) : null;   // Display only background while loading

    return (
        <BackgroundContainer>
            {content}
        </BackgroundContainer>
    );
}
