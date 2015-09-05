'use strict';

import axios from 'axios';
import React from 'react';

var numeral = require('numeral');

export default React.createClass({

    getDefaultProps: function () {
        return {};
    },

    getInitialState: function () {
        return {
        };
    },

    getStarship: function() {
        axios.get('http://swapi.co/api/starships/').then((response) => {
            this.setState({
                starships: response.data.results
            });
        });
    },

    componentWillMount() {
        this.getStarship();
    },

    componentWillReceiveProps(props) {
        this.getStarship();
    },

    render() {
        return (
            <h1>Starship Details!</h1>
        );
    }
});