import React from 'react';
import ReactDOM from 'react-dom';
import Converter from './components/Converter';
import './index.css';

const App = () => {
    return (
        <div className='container my-5'>
            <div className='row'>
                <Converter />
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
