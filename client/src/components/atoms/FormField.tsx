import { TextField } from "@material-ui/core"

export interface IFormFieldProps {
    inputName: string;
    formik: any;
    inputType?: 'text' | 'password';
    label: string;
    className?: string;
}

export const FormField = (props: IFormFieldProps) => {

    const { inputName } = props;

    return (
        <TextField
            id={inputName}
            name={inputName}
            className={props.className}
            label={props.label}
            type={props.inputType || 'text'}
            value={props.formik.values[inputName]}
            onChange={props.formik.handleChange}
            error={props.formik.touched[inputName] && Boolean(props.formik.errors[inputName])}
            helperText={props.formik.touched[inputName] && props.formik.errors[inputName]}            
        />
    )
}