import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

export type AlertSnackbarSeverity = 'error' | 'warning' | 'info' | 'success';

export interface IAlertSnackbarData {
    severity: AlertSnackbarSeverity;
    isOpen: boolean;
    msg: string;
}

export interface IAlertSnackbarProps extends IAlertSnackbarData {
    hideDuration?: number;
    handleClose: () => void;
    isOpen: boolean;
}

export const IAlertSnackbarDataDefaultState : IAlertSnackbarData = {
    severity: 'info',
    isOpen: false,
    msg: ''
}

export const AlertSnackbar = (props: IAlertSnackbarProps) => {
    return (
        <Snackbar open={props.isOpen} autoHideDuration={props.hideDuration || 1500} onClose={props.handleClose}>
            <Alert onClose={props.handleClose} severity={props.severity}>{props.msg}</Alert>
        </Snackbar>
    )
}

const Alert = (props: AlertProps) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}