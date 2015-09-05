'use strict';

import axios from 'axios';
import React from 'react';

var numeral = require('numeral');

const StartWars = React.createClass({

    getDefaultProps: function () {
        return {};
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

    renderRows: function () {
        return this.state.starships.map((row, idx) => {
            return (
                <tr key={idx}>
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
            <table className="table table-striped">
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


React.render(<StartWars/>, document.querySelector('.app'));