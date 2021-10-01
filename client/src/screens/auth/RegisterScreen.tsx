import { createStyles, Grid, makeStyles, TextField } from '@material-ui/core'
import { Email, Lock, Person, GitHub } from '@material-ui/icons';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AuthCard } from '../../components/organisms/AuthCard';
import { RootState } from '../../store';
import * as yup from 'yup';
import { FormField } from '../../components/atoms/FormField';
import styled from 'styled-components';
import { AlertSnackbar, AlertSnackbarSeverity, IAlertSnackbarData, IAlertSnackbarDataDefaultState } from '../../components/molecules/AlertSnackbar';
import { handle } from '../../utils/PromiseHandler';
import { CreateUser } from '../../services/user.service';
import { AxiosError, AxiosResponse } from 'axios';
import { RegisterResponse } from '../../interfaces/ApiResponses';
import { SetupAxiosSecured } from '../../constants/AxiosSecured';
import { SetUser } from '../../store/app/AppAction';
import { OnUserLogin } from '../../services/auth.service';

const useStyles = makeStyles(() =>
    createStyles({
        name_fields_container: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
        },
        name_field: {
            flex: 1,
            minWidth: 180,
            flexWrap: 'nowrap'
        },
        flex: {
            display: 'flex',
            flex: 1
        },
        marginTop10: {
            marginTop: 10,
        }
    }),
);

interface IRegisterForm {
    user_name: string;
    github_profile: string;
    email: string;
    password: string;
    confirm_password: string;
}

const formInitialState: IRegisterForm = {
    user_name: '',
    github_profile: '',
    email: '',
    password: '',
    confirm_password: '',
}

const validationSchema = yup.object({
    github_profile: yup
        .string()
        .min(4, 'Minimum 4 characters length')
        .required('Github profile is required'),
    user_name: yup
        .string()
        .min(4, 'Minimum 4 characters length')
        .required('Username is required'),
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(3, 'Minimum 3 characters length')
        .required('Password is required'),
    confirm_password: yup
        .string()
        .min(3, 'Minimum 3 characters length')
        .required('confirm_password is required'),
});

export const RegisterScreen = () => {

    const styles = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.app.user);
    const [renderCard, setRenderCard] = useState(false);
    const [alertSnackbarData, setAlertSnackbarData] = useState<IAlertSnackbarData>(IAlertSnackbarDataDefaultState);

    //#region Callbacks
    const tryRegister = async (data: IRegisterForm) => {

        if(data.password != data.confirm_password){
            OpenSnackbar('Passwords must match','error')
            return;
        }

        const [response, error] = await handle(CreateUser({
            user_name: data.user_name,
            github_profile: data.github_profile,
            email: data.email,
            password: data.password
        }));

        if (error) {
            const errorMsg = (error as AxiosError).response?.data.message;
            OpenSnackbar(errorMsg,'error')
            return;
        }

        // Login successfully
        OpenSnackbar('Registered Successfully', 'success')
        setRenderCard(false)

        const responseData : RegisterResponse = (response as AxiosResponse).data

        // Initialize Axios with the auth header
        SetupAxiosSecured(dispatch,responseData.token);
        
        setTimeout(() => {
            // Start login
            dispatch(SetUser(responseData.data));
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
        onSubmit: tryRegister
    });

    //#region Hooks
    useEffect(() => {
        setRenderCard(true);
    }, [])

    useEffect(() => {
        if (user)    // Redirect component not working
            history.push('/home')
    }, [user])
    //#endregion

    return (
        <FormContainer onSubmit={formik.handleSubmit}>
            <AuthCard title='Register' actionButtonTitle='Register' footerLabel="Already have an account?" footerLinkRoute='/login' footerLinkTitle='Login' isOpen={renderCard} onPressActionBtn={() => { }}>
                {/* Form content */}
                {/* Info*/}

                {/* Name fields */}
                <div className={styles.name_fields_container}>
                    <Grid container spacing={1} alignItems="flex-end" className={styles.name_field}>
                        <Grid item>
                            <Person htmlColor='#636363' />
                        </Grid>
                        <Grid item className={styles.flex}>
                            <FormField formik={formik} className={styles.flex} inputName='user_name' label="Username" />
                        </Grid>
                    </Grid>

                    <Grid container spacing={1} alignItems="flex-end" className={styles.name_field}>
                        <Grid item>
                            <GitHub htmlColor='#636363' />
                        </Grid>
                        <Grid item className={styles.flex}>
                            <FormField formik={formik} className={styles.flex} inputName='github_profile' label="Github profile" />
                        </Grid>
                    </Grid>
                </div>

                <Grid container spacing={1} alignItems="flex-end" className={styles.marginTop10}>
                    <Grid item>
                        <Email htmlColor='#636363' />
                    </Grid>
                    <Grid item className={styles.flex}>
                        <FormField formik={formik} className={styles.flex} inputName='email' label="Email" />
                    </Grid>
                </Grid>

                {/* Passwords */}
                <Grid container spacing={1} alignItems="flex-end" className={styles.marginTop10}>
                    <Grid item>
                        <Person htmlColor='#636363' />
                    </Grid>
                    <Grid item className={styles.flex}>
                        <FormField formik={formik} className={styles.flex} inputName='password' label="Password" inputType='password'/>
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end" className={styles.marginTop10}>
                    <Grid item>
                        <Lock htmlColor='#636363' />
                    </Grid>
                    <Grid item className={styles.flex}>
                        <FormField formik={formik} className={styles.flex} inputName='confirm_password' label="Confirm password" inputType='password'/>
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
