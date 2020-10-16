import React from 'react';
import ReactDOM from 'react-dom'

import Contacts from './Components/contacts';

class App extends React.Component {
    render(){
        return(<Contacts/>);
    }
};

ReactDOM.render(<App/>, document.getElementById('root'));