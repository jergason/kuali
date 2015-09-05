'use strict';

import axios from 'axios';
import React from 'react';
import { Navigation } from 'react-router';

var numeral = require('numeral');

export default React.createClass({
    mixins: [Navigation],

    getDefaultProps: function () {
        return {
            filterText: null
        };
    },

    getInitialState: function () {
        return {
            starships: []
        };
    },

    getStarships: function() {
        axios.get('http://swapi.co/api/starships/').then((response) => {
            this.setState({
                starships: response.data.results
            });
        });
    },

    componentWillMount() {
        this.getStarships();
    },

    componentWillReceiveProps(props) {
        this.getStarships();
    },

    handleClickRow(url) {
        //unfortunately it seems swapi doesn't give us the starship id.
        //here we strip it from the url, so we can pass it to the route.
        var parts = url.split('/');
        var starship_id = parts[parts.length-2];
        this.transitionTo(`/detail/${starship_id}`);
    },

    renderRows: function () {
        let filter = this.props.filterText ? this.props.filterText.toLowerCase() : null;

        return this.state.starships.filter((row) => {
            return !filter ||
                (row.name.toLowerCase().includes(filter)) ||
                (row.starship_class.toLowerCase().includes(filter)) ||
                (row.manufacturer.toLowerCase().includes(filter));
        }).map((row, idx) => {
            return (
                <tr key={idx} onClick={this.handleClickRow.bind(this, row.url)}>
                    <td>{row.name}</td>
                    <td>{numeral(row.cost_in_credits).format('$0,0.00')}</td>
                    <td>{numeral(row.cargo_capacity).format('0,0')}</td>
                    <td>{row.starship_class}</td>
                </tr>
            );
        });
    },

    render() {
        return (
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Cargo Capacity</th>
                    <th>Class</th>
                </tr>
                </thead>
                <tbody>
                {this.renderRows()}
                </tbody>
            </table>
        );
    }
});