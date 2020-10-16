import React, {Component} from 'react';
import ContactsTable from './contactsTable';
import ContactModal from './contactModal';
import Alert from './alert';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


//container component
const headers = {'Name': 'contact_name', 'Company Name': 'company_name', 
'EMAIL': 'email', 'WORK PHONE': 'phone', 
'GST TREATMENT': 'contact_type', 'RECEIVABLES': 'recievables', 
'PAYABLES': 'payables'};

const baseUrl = 'http://localhost:3001/contacts';
const urlHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
}

export default class Contacts extends Component  {
    constructor(props){
        super(props);
        this.state = {
            contacts: null,
            headers: headers,
            displayModal: false,
            shouldDisplayAlert: false,
            alertMessage: '',
            alertSeverity: ''
        }
    }

    componentDidMount(){
        const url = baseUrl;
        const headers = urlHeaders;
        fetch(url, {
            headers, 
            method: 'GET'
        }).then((res) => {
            try{
                if(res.status !== 200) throw new Error('server error, something went wrong');
                return res.json()
            }
            catch(err){
                throw err;
            }
        }).then((body) => {
            try{
                const {status, message ,data} = body;
                if(!status) throw new Error('data fetching error', message);
                data.forEach(contact => {
                    contact.recievables = contact.currency_code + contact.recievables;
                    contact.payables = contact.currency_code + contact.payables;
                });
                this.setState({
                    contacts: data,
                });
            }
            catch(err){
                throw err;
            }
        }).catch(err => {
            const message = (err.message)? err.message : 'something went wrong while fetching contacts';
            alert(message); //can use custom material ui alerts here as well.
        });
    };

    handleFormSubmit = (contactData) => {
        const url = baseUrl;
        const headers = urlHeaders;
        const body = JSON.stringify({contact: contactData});
        fetch(url, {headers, body, method: 'POST'}).then((res) => {
            try{
                if(res.status !== 200) throw new Error('server error, something went wrong');
                return res.json();
            }
            catch(err){
                throw err;
            }
        }).then(body => {
            try{
                const {status, message ,data} = body;
                if(!status) new Error('data inserting error', message);
                const {contacts} = this.state;
                const {insertId} = data;
                contactData.id = insertId;
                contactData.recievables = contactData.currency_code + contactData.recievables;
                contactData.payables = contactData.currency_code + contactData.payables;
                this.setState({
                    contacts: [...contacts, contactData],
                    shouldDisplayAlert: true,
                    alertMessage: 'contact successfully added',
                    alertSeverity: 'success'
                });
            }
            catch(err){
                throw err;
            }
        }).catch(err => {
            const message = (err.message)? err.message : 'something went wrong while fetching contacts';
            alert(message);
        });
    }

    handleAddButtonClick = () => {
        this.setState({
            displayModal: true,
        });
    }

    closeContactModal = () => {
        this.setState({
            displayModal: false,
        })
    }

    toggleAlert = (shouldDisplayAlert, alertMessage = '', alertSeverity = '') => {
        this.setState({
            shouldDisplayAlert,
            alertMessage,
            alertSeverity,
        });
    }

    
    
    render(){
        const {contacts, headers, displayModal} = this.state;
        const {shouldDisplayAlert, alertMessage, alertSeverity} = this.state
        return(
            <React.Fragment>
            <Alert open={shouldDisplayAlert} message={alertMessage} toggleAlert={this.toggleAlert} severity={alertSeverity} /> 
            <Grid container direction='row' justify='center'>
                <Grid item xs={12}>
                    <ContactsTable contacts={contacts} headers={headers}/>
                </Grid>
                <Grid item  xs={12}>
                    <Button color="primary" style={{float: 'right'}} onClick={this.handleAddButtonClick}>Add</Button>
                </Grid>
                <ContactModal displayModal={displayModal} closeModal = {this.closeContactModal} handleContactFormSubmit={this.handleFormSubmit} displayAlert={this.toggleAlert}/>
            </Grid>
            </React.Fragment>
        );
    }
};