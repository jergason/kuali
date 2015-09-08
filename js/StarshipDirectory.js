'use strict';

import React from 'react';
import StarshipList from './StarshipList';
import Breadcrumb from './Breadcrumb';

export default React.createClass({
    getDefaultProps: function () {
        return {
        };
    },

    getInitialState: function () {
        return {
            filterText: null,
            filterCost: null
        };
    },

    handleFilterInputChange(evt) {
        this.setState({
           filterText: evt.target.value
        });
    },

    handleFilterCostInputChange(evt) {
        this.setState({
           filterCost: evt.target.value
        });
    },

    render() {
        return (
            <div>
                <Breadcrumb />

                <form className="form-inline row">
                    <div className="form-group col-md-6">
                        <input type="text" className="form-control" placeholder="Search text..." onChange={this.handleFilterInputChange} />
                    </div>

                    <div className="form-group col-md-6">
                        <input type="text" className="form-control" placeholder="Filter by maximum cost..." onChange={this.handleFilterCostInputChange} />
                    </div>
                </form>

                <StarshipList filterText={this.state.filterText} filterCost={this.state.filterCost} />
            </div>
        );
    }
});