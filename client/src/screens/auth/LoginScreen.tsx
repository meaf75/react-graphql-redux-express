import { Grid } from '@material-ui/core'
import { Email, Lock } from '@material-ui/icons';
import { AuthCard } from '../../components/organisms/AuthCard';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import styled from 'styled-components';
import { FormField } from '../../components/atoms/FormField';
import { OnUserLogin, SendLoginRequest } from '../../services/auth.service';
import { handle } from '../../utils/PromiseHandler';
import { AxiosError, AxiosResponse } from 'axios';
import { AlertSnackbar, AlertSnackbarSeverity, IAlertSnackbarData, IAlertSnackbarDataDefaultState } from '../../components/molecules/AlertSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { AuthLoginResponse } from '../../interfaces/ApiResponses';
import { SetUser } from '../../store/app/AppAction';
import { RootState } from '../../store';
import { SetupAxiosSecured } from '../../constants/AxiosSecured';

interface ILoginForm {
    identifier_key: string;
    password: string;
}

const formInitialState: ILoginForm = {
    identifier_key: '',
    password: '',
}

const validationSchema = yup.object({
    identifier_key: yup
        .string()
        .required('This field is required'),
    password: yup
        .string()
        .min(6, 'Minimum 6 characters length')
        .required('Password is required'),
});

export const LoginScreen = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.app.user);
    const [renderCard, setRenderCard] = useState(false);
    const [alertSnackbarData, setAlertSnackbarData] = useState<IAlertSnackbarData>(IAlertSnackbarDataDefaultState);

    //#region Callbacks
    const trySendData = async (data: ILoginForm) => {
        const [response, error] = await handle(SendLoginRequest(data.identifier_key, data.password));

        if (error) {
            const errorMsg = (error as AxiosError).response?.data.message;
            OpenSnackbar(errorMsg,'error')
            return;
        }

        // Login successfully
        OpenSnackbar('Login Successfully', 'success')
        setRenderCard(false)

        const responseData : AuthLoginResponse = (response as AxiosResponse).data

        // Initialize Axios with the auth header
        SetupAxiosSecured(dispatch,responseData.token);

        dispatch(SetUser(responseData.data));

        setTimeout(() => {
            OnUserLogin(dispatch,responseData.token);
        }, 1500);
    }

    const OpenSnackbar = (msg: string, severity: AlertSnackbarSeverity) => {
        setAlertSnackbarData({
            severity,
            msg,
            isOpen: true
        });
    }

    const CloseSnackbar = () => {
        const newData = {...alertSnackbarData};
        newData.isOpen = false;
        setAlertSnackbarData(newData);
    }
    //#endregion

    const formik = useFormik({
        initialValues: formInitialState,
        validationSchema: validationSchema,
        onSubmit: trySendData
    });

    useEffect(() => {
        setRenderCard(true);
    }, [])

    useEffect(() => {
        if(user)    // Redirect component not working
            history.push('/home')
    }, [user])
    
    return (
        <FormContainer onSubmit={formik.handleSubmit}>
            <AuthCard title='Login' actionButtonTitle='Login' footerLabel="Don't have an account?" footerLinkRoute='/register' footerLinkTitle='Create one' isOpen={renderCard} onPressActionBtn={() => { }}>
                {/* Form content */}
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <Email htmlColor='#636363' />
                    </Grid>
                    <Grid item>
                        <FormField inputName='identifier_key' label='Email or Username' formik={formik} inputType='text' />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <Lock htmlColor='#636363' />
                    </Grid>
                    <Grid item>
                        <FormField inputName='password' label='Password' formik={formik} inputType='password' />
                    </Grid>
                </Grid>
            </AuthCard>

            <AlertSnackbar {...alertSnackbarData} handleClose={CloseSnackbar} />
        </FormContainer>
    )
}

const FormContainer = styled.form`
    height: 100%;
`;

