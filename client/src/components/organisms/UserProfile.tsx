import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { createStyles, IconButton, makeStyles, TextField } from "@material-ui/core";
import { Cancel, Edit, Save } from "@material-ui/icons";
import { useState } from "react";
import { IUser } from "../../interfaces/IUser";
import { SetUser } from "../../store/app/AppAction";

const useStyles = makeStyles(() =>
    createStyles({
        textField: {
            color: 'white'
        },
        input: {
            color: 'white',
            borderColor: 'white'
        },
        notchedOutline: {
            color: 'white',
            borderColor: 'white'
        },        
    }),
);

export const UserProfile = () => {

    const dispatch = useDispatch();
    const styles = useStyles();

    const [isEditMode,setIsEditMode] = useState(false);
    const [inputText,setInputText] = useState('');
    const { user, githubUserNotFound, github_img_url } = useSelector((state: RootState) => state.app);

    //#region Callbacks
    const SwitchEditState = () => {

        const changeToEditMode = !isEditMode;

        if(changeToEditMode)
            setInputText(user?.github_profile || '')

        setIsEditMode(!isEditMode);
    }

    const OnChangeTextValue = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(evt.target.value);
    }

    const OnPressSave = () => {

        const newProfile = inputText.trim();


        if(!inputText || newProfile == user?.github_profile) // Do nothing
            return

        const newUserData : IUser = {...user} as IUser;
        newUserData.github_profile = newProfile;

        setIsEditMode(false);

        dispatch(SetUser(newUserData));
    }
    //#endregion

    return (
        <MainContainer>

            { githubUserNotFound ? (
                <UserNotFoundWarning>Github user [{user?.github_profile}] not found</UserNotFoundWarning>
            ): (
                <GithubProfileImg src={github_img_url}/>
            )}

            <UserNameContainer>
                { !isEditMode ? (
                    // Current user  github username
                    <>
                        <UserNameLabel>{user?.github_profile}</UserNameLabel>
                        <IconButton color='primary' onClick={SwitchEditState}>
                            <Edit htmlColor='white'/>
                        </IconButton>
                    </>
                ): (
                    // Edit github username
                    <>
                        <TextField id="standard-basic" label="Github username" 
                            variant="standard"                             
                            color="secondary"
                            value={inputText}
                            onChange={OnChangeTextValue}
                            InputLabelProps={{
                                classes: {
                                    root: styles.notchedOutline,
                                    focused: styles.notchedOutline,                                    
                                }
                            }}
                            inputProps={{
                                className: styles.input,
                                classes: {
                                    root: styles.notchedOutline,
                                    focused: styles.notchedOutline,
                                    notchedOutline: styles.notchedOutline,
                                }
                            }}
                        />

                        <IconButton color='primary' onClick={SwitchEditState}>
                            <Cancel htmlColor='white'/>
                        </IconButton>

                        <IconButton color='primary' onClick={OnPressSave}>
                            <Save htmlColor='white'/>
                        </IconButton>
                    </>
                )}
                
            </UserNameContainer>
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

const GithubProfileImg = styled.img`
    src: ${props => props.src};
    width: 300px;
    height: 300px;
    border-radius: 50%;
`;

const UserNotFoundWarning = styled.span`
    margin-top: 20px;
    margin-bottom: 20px;
    color: white;
    font-size: 30px;
`;

const UserNameLabel = styled.b`
    font-size: 20px;
    color: white;
`;

const UserNameContainer = styled.div`
    flex-direction: row;
    display: flex;
    align-items: center;
`;
