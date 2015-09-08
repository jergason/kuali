'use strict';

import axios from 'axios';
import React, { PropTypes } from 'react';
import { Navigation } from 'react-router';
import Breadcrumb from './Breadcrumb';
import StarshipPilots from './StarshipPilots';

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
            starship: {},
            loading: true
        };
    },

    getStarship: function() {
        let starship_id = this.context.router.getCurrentParams().starship_id;

        axios.get(`http://swapi.co/api/starships/${starship_id}/`).then((response) => {
            this.setState({
                starship: response.data,
                loading: false
            });
        });
    },

    componentWillMount() {
        this.getStarship();
    },

    render() {
        if(this.state.loading) {
            return (
                <img src="/img/ajax-loader.gif" />
            );
        }else {
            return (
                <div>
                    <Breadcrumb starship={this.state.starship} />
                    <h1>{this.state.starship.name} </h1>
                    <ul className="list-unstyled">
                        <li><strong>Price: </strong>{this.state.starship.cost_in_credits} galactic credits</li>
                        <li><strong>Manufacturer: </strong>{this.state.starship.manufacturer}</li>
                        <li><strong>Length: </strong>{this.state.starship.length} m</li>
                        <li><strong>Class: </strong>{this.state.starship.starship_class}</li>
                        <li><strong>Max Speed: </strong>{this.state.starship.max_atmosphering_speed}</li>
                    </ul>
                    <StarshipPilots starship={this.state.starship} />
                </div>
            );
        }
    }
});