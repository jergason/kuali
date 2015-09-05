'use strict';

import axios from 'axios';
import React, { PropTypes } from 'react';
import { Navigation } from 'react-router';

var numeral = require('numeral');

export default React.createClass({
    mixins: [Navigation],

    contextTypes: {
        router: PropTypes.func
    },

    getDefaultProps: function () {
        return {};
    },

    getInitialState: function () {
        return {
            starship: {}
        };
    },

    getStarship: function() {
        let starship_id = this.context.router.getCurrentParams().starship_id;

        axios.get(`http://swapi.co/api/starships/${starship_id}/`).then((response) => {
            this.setState({
                starship: response.data
            });
        });
    },

    componentWillMount() {
        this.getStarship();
    },

    componentWillReceiveProps(props) {
        this.getStarship();
    },

    handleBackButtonClick() {
        this.transitionTo('/');
    },

    render() {
        return (
            <div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={this.handleBackButtonClick}>Back</button>
                </div>
                <h1>{this.state.starship.name} </h1>
                <ul class="list-unstyled">
                    <li><strong>Manufacturer: </strong>{this.state.starship.manufacturer}</li>
                    <li><strong>Price: </strong>{this.state.starship.cost_in_credits}</li>
                    <li><strong>Length: </strong>{this.state.starship.length}</li>
                    <li><strong>Class: </strong>{this.state.starship.starship_class}</li>
                    <li><strong>Max Speed: </strong>{this.state.starship.max_atmosphering_speed}</li>
                </ul>
            </div>
        );
    }
});