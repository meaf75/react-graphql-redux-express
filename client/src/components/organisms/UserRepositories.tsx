import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { RepositoryCard } from "../molecules/RepositoryCard";

export const UserRepositories = () => {

    const { repositories, starredRepositories, githubUserNotFound } = useSelector((state: RootState) => state.app);

    const userRepositories = repositories?.map((r,i) => <RepositoryCard repository={r} key={`own-repo-${i}`}/>)
    const userStarredRepositories = starredRepositories?.map((r,i) => <RepositoryCard repository={r} key={`starred-repo-${i}`}/>)

    if(githubUserNotFound)
        return null;

    return (
        <MainContainer>
            <TitleLabel>Owned repositories ({userRepositories?.length ?? 0}):</TitleLabel>
            {userRepositories}

            <br/>

            <TitleLabel>Starred repositories ({starredRepositories?.length ?? 0}):</TitleLabel>
            {userStarredRepositories}
        </MainContainer>
    )
}

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 20px;
`;

const TitleLabel = styled.b`
    margin-top: 20px;
    font-size: 20px;
    color: white;
    align-self: baseline;
`;
