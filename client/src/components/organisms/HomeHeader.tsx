import { Button, Menu } from "@material-ui/core";
import styled from "styled-components";
import { OnUserLogout } from "../../services/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

export interface IHeaderMenuElementProps {
    title: string;
    options: string[];
}

export const HomeHeader = () => {

    const dispatch = useDispatch();

    const user = useSelector((state: RootState) => state.app.user);

    const onClickLogOut = () => {
        OnUserLogout(dispatch)
    }

    return (
        <MainContainer>
            {/* Page icon */}
            <UsernameLabel>Welcome, {user?.user_name}</UsernameLabel>


            {/* right buttons */}
            <Button color="secondary" size="large" onClick={onClickLogOut}>Logout</Button>
        </MainContainer>
    )
}

const UsernameLabel = styled.b`
    color: white;
    font-size: 20px;
    margin-left: 10px;
`

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    background-color: #4e4e4e;
    box-shadow: 1px 10px 2px black;
    padding: 5px;
    justify-content: space-between;
    top: 0;
    position: sticky;
    z-index: 1;
`;
