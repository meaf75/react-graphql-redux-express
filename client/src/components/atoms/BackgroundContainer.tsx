import styled from "styled-components";
import background from '../../assets/background.webp'

export const BackgroundContainer = styled.div`
    background-image: url(${background});
    
    /* Full height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    
    overflow: auto;
`;