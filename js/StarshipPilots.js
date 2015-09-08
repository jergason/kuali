'use strict';

import axios from 'axios';
import React, { PropTypes } from 'react';
import { Navigation } from 'react-router';


export default React.createClass({
    getDefaultProps: function () {
        return {
            starship: null
        };
    },

    getInitialState: function () {
        return {
            pilots: [],
            loading: true
        };
    },

    getPilots() {
        //this api kinda sucks, it's pretty inefficient to do this.
        if(this.props.starship && this.props.starship.pilots) {
            this.props.starship.pilots.forEach((pilot) => {
                axios.get(pilot).then((response) => {
                    var pilots = this.state.pilots;
                    pilots.push(response.data);
                    this.setState({
                        pilots: pilots,
                        loading: pilots.length != this.props.starship.pilots.length
                    });
                });
            });
        }
    },

    componentWillMount() {
        this.getPilots();
    },


    renderPilots: function() {
        return this.state.pilots.map(function(person) {
            return (
                <li className="list-group-item">
                    <h4 className="list-group-item-heading">{person.name}</h4>
                    <p className="list-group-item-text">{person.gender}, {person.height} cm tall, {person.eye_color} eyes.</p>
                </li>
            );
        });

    },

    render() {
        if(this.props.starship.pilots.length == 0) {
            return (<h3>No Pilots</h3>);
        }
        var loadingImg = null;

        if(this.state.loading) {
            loadingImg = <img src="/img/ajax-loader.gif" />;
        }

        return (
            <div>
                <h3>Pilots</h3>
                <ul className="list-group">
                    {this.renderPilots()}
                </ul>
                {loadingImg}
            </div>
        );
    }
});