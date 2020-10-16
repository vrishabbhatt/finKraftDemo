import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = (themes) => ({
    table: {
      minWidth: 650,
    },
});


class ContatcsTable extends Component {
    createHeaders = () => {
        const {headers} = this.props;
        return(
            <TableHead>
                <TableRow>
                {Object.keys(headers).map((header, index) => {
                    return <TableCell key={'contact_header_'+index}>{header}</TableCell>
                })}
                </TableRow>      
            </TableHead>
        );
    };

    createRows = () => {
        console.log('props: ', this.props);
        const {contacts, headers} = this.props;
        if(!contacts) return [];
        return contacts.map( (contact, index) => {
            return(
                <TableRow key={'contacts_row_'+index}>
                    {Object.keys(headers).map((header, i) => {
                        const displayKey = headers[header];
                        return <TableCell key={'contact_row_'+index+'_'+i}>{contact[displayKey]}</TableCell>
                    }
                    )}
                </TableRow>
            );
        });
    }

    render(){
        return (
            <div>
                <TableContainer component={Paper}>
                    <Table className='contactsTable' size="small" aria-label="a dense table">
                        {this.createHeaders()}
                        <TableBody>{this.createRows()}</TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    };
}

export default withStyles(styles)(ContatcsTable);