import React from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

import Alert from './alert';
const initialContactValues = {
    contact_name: '',
    company_name: '',
    contact_type: 'customer',
    status: 'active',
    currency_code: 'INR',
    payables: 0,
    recievables: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    mobile: '',
}

const initialHelperText = {
    email: '',
    payables: '',
    recievables: '',
};

const initalAlertState = {
    display: false,
    message: ''
}
const useStyle = makeStyles(theme => ({
    root: {
        backgroundColor: 'white',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5,
        '& .MuiTextField-root': {
            width: '80%',
            margin: theme.spacing(1),
        },
        '& .MuiFormControl-root': {
            margin: theme.spacing(1),
        },
        '& .MuiButton-root': {
            margin: theme.spacing(1),
        },
    }
}));

const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const validateNumber = (number) => {
    return !isNaN(number);
}

export default function ContactModal({displayModal, closeModal, handleContactFormSubmit, displayAlert}) {
    const open = displayModal;
    const [isFormValid, setFormValid] = React.useState(false);
    const [alertState, setAlertState] = React.useState(initalAlertState);
    const [contactValues, setContactValue] = React.useState(initialContactValues);
    const [helperTexts, setHelperTexts] = React.useState(initialHelperText);

    const classes = useStyle();
    
    function handleSubmit(event){
        event.preventDefault();
        if(!isFormValid){
            toggleAlert(true, 'contact form is not valid, please check the fields');
            return;
        }
        handleContactFormSubmit(contactValues);
        close();
    }

    const toggleAlert = (display, message='') => {
        setAlertState({display, message});
    }

    //basic validator
    const updateHelperText = (name, value) => {
        if(helperTexts[name] != null){
            switch(name){
                case 'email': {
                    const isValid = validateEmail(value);
                    const newObj = {};
                    newObj[name] = (isValid)? '' : 'email is not valid';
                    setHelperTexts({...helperTexts, ...newObj});
                    setFormValid(isValid);
                    break;
                }
                case 'payables': {
                }
                case 'recievables':{
                    const isValid = validateNumber(value);
                    const newObj = {};
                    newObj[name] = (isValid)? '' : 'amount is not valid';
                    setHelperTexts({...helperTexts, ...newObj});
                    setFormValid(isValid);
                    break;
                }
                default: {}
            }
        }
    }

    const close = () => {
        setContactValue(initialContactValues);
        closeModal();
    }

    const updateFormValues = e => {
        const {name, value} = e.target;
        const newObj = {};
        newObj[name] = value;
        updateHelperText(name, value);
        setContactValue({...contactValues, ...newObj});
    }

    const body = (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center' ,borderColor: 'transparent', overflowY: 'scroll'}}>
            <form className={classes.root}>
                <Typography variant='h4' align='left'>Create new contact</Typography>
                <TextField variant='outlined' label='contact name' name='contact_name' value={contactValues.contact_name} onInput={updateFormValues} />
                <TextField variant='outlined' label='company name' name='company_name' value={contactValues.company_name} onInput={updateFormValues} />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Contact type</FormLabel>
                    <RadioGroup aria-label="status" name="contact_type" value={contactValues.contact_type} onChange={updateFormValues} row>
                        <FormControlLabel value="customer" control={<Radio />} label="customer" />
                        <FormControlLabel value="company" control={<Radio />} label="company" />
                    </RadioGroup>
                </FormControl>
                <br/>
                <FormControl component="fieldset">
                    <FormLabel component="legend">status</FormLabel>
                    <RadioGroup aria-label="status" name="status" value={contactValues.status} onChange={updateFormValues} row>
                        <FormControlLabel value="active" control={<Radio />} label="active" />
                        <FormControlLabel value="inactive" control={<Radio />} label="inactive" />
                    </RadioGroup>
                </FormControl>
                <br/>
                <FormControl component="fieldset">
                    <FormLabel component="legend">currency</FormLabel>
                    <RadioGroup aria-label="status" name="currency_code" value={contactValues.currency_code} onChange={updateFormValues} row>
                        <FormControlLabel value="INR" control={<Radio />} label="INR" />
                        <FormControlLabel value="USD" control={<Radio />} label="USD" />
                    </RadioGroup>
                </FormControl>
                <TextField variant='outlined' label='payables' name='payables' value={contactValues.payables} helperText={helperTexts.payables} onInput={updateFormValues} />
                <TextField variant='outlined' label='recievables' name='recievables' value={contactValues.recievables} helperText={helperTexts.recievables} onInput={updateFormValues} />
                <Grid container justify='center'>
                    <Grid item sm={6} xs={12}>
                        <TextField variant='outlined' label='first name' name='first_name' value={contactValues.first_name} onInput={updateFormValues} />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField variant='outlined' label='last name' name='last_name' value={contactValues.last_name} onInput={updateFormValues} />
                    </Grid>
                </Grid>
                <TextField variant='outlined' label='email' name='email' value={contactValues.email} onInput={updateFormValues} helperText={helperTexts.email} />
                <Grid container justify='center'>
                    <Grid item sm={6} xs={12}>
                        <TextField variant='outlined' label='phone' name='phone' value={contactValues.phone} onInput={updateFormValues} />
                    </Grid>
                    <Grid item sm={6} xs={12}>
                        <TextField variant='outlined' label='mobile' name='mobile' value={contactValues.mobile} onInput={updateFormValues} />
                    </Grid>
                </Grid>
                <Button variant="contained" color='primary' onClick={handleSubmit}>Submit</Button>
            </form>
        </div>
    )

    

    return(
        <Modal open={open} onClose={close} BackdropProps={{ style: { borderColor: "transparent" } }}>
            <React.Fragment>
                <Alert open={alertState.display} message={alertState.message} toggleAlert={toggleAlert} />
                {body}
            </React.Fragment>
        </Modal>
    );
}

