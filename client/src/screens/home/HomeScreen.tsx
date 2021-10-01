import { useEffect, useState } from "react"
import { SimpleTransition } from "../../components/molecules/SimpleTransition"
import { HomeHeader } from "../../components/organisms/HomeHeader"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { useHistory } from "react-router-dom"
import { useLazyQuery } from "@apollo/client"
import { GET_USER_REPOSITORIES_QUERY } from "../../graphql/Queries"
import { UserProfile } from "../../components/organisms/UserProfile"
import { IGetRepositoriesResponse } from "../../interfaces/IGetRepositoriesResponse"
import { SetProfileGithubUrl, SetUserNotFound, SetUserRepositories, SetUserStarredRepositories } from "../../store/app/AppAction"
import { UserRepositories } from "../../components/organisms/UserRepositories"

export const HomeScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.app.user);
    const [renderContent, setRenderContent] = useState(false);
    const [renderGithubProfile, setRenderGithubProfile] = useState(false);

    /** Request repositories */
    const [getRepositoriesFromUserName, { data, error,loading,   } ] = useLazyQuery<IGetRepositoriesResponse>(GET_USER_REPOSITORIES_QUERY);


    //#region Hooks
    useEffect(() => {
        setRenderContent(true);
    }, [])

    useEffect(() => {
        if (!user)    // Redirect component not working
            history.push('/login')
    }, [user])

    useEffect(() => {
        if (!user?.github_profile)    // Do nothing
            return

        setRenderGithubProfile(false);
        
        console.log('Searching repos');

        setTimeout(() => {
            getRepositoriesFromUserName({variables: { user_name: user?.github_profile },});              
        }, 500);

    }, [user?.github_profile])

    useEffect(() => {

        if(loading)
            return

        let resetStates = false;

        // Loaded an error?
        if(error){
            console.log('Error: ', error);
            resetStates = true;
        }

        // Check user object state
        if(!data?.user){
            dispatch(SetUserNotFound(true));
            resetStates = true;
        }

        if(resetStates || !data?.user){
            dispatch(SetUserRepositories([]))
            dispatch(SetUserStarredRepositories([]))

            setRenderGithubProfile(true);
            return;
        }
        
        dispatch(SetUserRepositories(data.user.repositories.nodes))
        dispatch(SetUserStarredRepositories(data.user.starredRepositories.nodes))
        dispatch(SetUserNotFound(false));
        dispatch(SetProfileGithubUrl(data.user.avatarUrl));
        
        setRenderGithubProfile(true);
        
        console.log('Data: ', data);
    }, [data, error])
    //#endregion

    return (
        <SimpleTransition isOpen={renderContent}>
            <div>
                <HomeHeader />

                <SimpleTransition isOpen={renderGithubProfile}>
                    <div>
                        <UserProfile/>
                        <UserRepositories/>
                    </div>
                </SimpleTransition>
            </div>
        </SimpleTransition>
    )
}

