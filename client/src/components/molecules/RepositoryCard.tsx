import styled from "styled-components";
import { useDispatch } from "react-redux";
import { IRepository } from "../../interfaces/IRepository";

interface RepositoryCardProps {
    repository: IRepository
}

export const RepositoryCard = (props: RepositoryCardProps) => {

    const { repository } = props;



    return (
        <MainContainer>
            <ColumnContainer>
                <RepositoryName href={repository.url}>{repository.name}</RepositoryName>
                <SimpleLabel>{repository.description}</SimpleLabel>
            </ColumnContainer>

            <ForkContainer>
                <SimpleLabel>Is forked?</SimpleLabel>
                <SimpleLabel color={repository.isFork ? 'red' : 'green'}>{repository.isFork ? "Yes" : "No"}</SimpleLabel>
            </ForkContainer>
        </MainContainer>
    )
}

const MainContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-self: stretch;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.432);    
    margin-bottom: 3px;
    justify-content: space-between;
    align-items: center;
`;

const RepositoryName = styled.a`
    margin-top: 20px;
    font-size: 20px;
    color: white;
    font-weight: bold;
    text-decoration: none;
`;

const SimpleLabel = styled.span`
    margin-top: 10px;
    color: ${props => props.color || '#d3d3d3'} ;
`;

const ForkContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
