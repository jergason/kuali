'use strict';

import axios from 'axios';
import React from 'react';
import { Navigation } from 'react-router';

var numeral = require('numeral');
var sortBy = require('sort-by');

export default React.createClass({
    mixins: [Navigation],

    getDefaultProps: function () {
        return {
            filterText: null
        };
    },

    getInitialState: function () {
        return {
            starships: [],
            next: null,
            loading: true,
            sort: 'name'
        };
    },

    getStarships: function (url = 'http://swapi.co/api/starships/') {
        this.setState({
            loading: true
        });

        axios.get(url, {
            transformResponse: axios.defaults.transformResponse.concat(
                function (data, headers) {
                    if(data && data.results) {
                        data.results.forEach(function(item){
                            item.cost_in_credits = parseInt(item.cost_in_credits) || 0;
                            item.cargo_capacity = parseInt(item.cargo_capacity) || 0;
                        });
                    }
                    return data;
                }
            )
        }).then((response) => {
            var existingStarships = this.state.starships;

            this.setState({
                starships: existingStarships.concat(response.data.results).sort(sortBy(this.state.sort)),
                next: response.data.next,
                loading: false
            });
        });
    },

    componentWillMount() {
        this.getStarships();
    },

    handleClickRow(url) {
        //unfortunately it seems swapi doesn't give us the starship id.
        //here we strip it from the url, so we can pass it to the route.
        var parts = url.split('/');
        var starship_id = parts[parts.length - 2];
        this.transitionTo(`/detail/${starship_id}`);
    },

    handleLoadMoreClick(evt) {
        evt.preventDefault();
        this.getStarships(this.state.next);
    },

    handleSort(key) {
        if(key == this.state.sort) {
            key = `-${key}`;
        }

        this.setState({
            starships: this.state.starships.sort(sortBy(key)),
            sort: key
        });
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
        var moreButton = null;
        var loadingImage = null;

        if (this.state.next) {
            moreButton = (
                <nav>
                    <ul className="pager">
                        <li><a href="#" onClick={this.handleLoadMoreClick}>Show More&hellip;</a></li>
                    </ul>
                </nav>
            );
        }
        if (this.state.loading) {
            loadingImage = <img src="/img/ajax-loader.gif"/>;
        }

        return (
            <div>
                <table className="table table-striped table-hover">
                    <thead>
                    <tr>
                        <th onClick={this.handleSort.bind(this, 'name')}>Name</th>
                        <th onClick={this.handleSort.bind(this, 'cost_in_credits')}>Price</th>
                        <th onClick={this.handleSort.bind(this, 'cargo_capacity')}>Cargo Capacity</th>
                        <th onClick={this.handleSort.bind(this, 'starship_class')}>Class</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderRows()}
                    </tbody>
                </table>
                {loadingImage}
                {moreButton}
            </div>
        );
    }
});