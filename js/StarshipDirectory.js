'use strict';

import React from 'react';
import StarshipList from './StarshipList';

export default React.createClass({
    getDefaultProps: function () {
        return {
        };
    },

    getInitialState: function () {
        return {
            filterText: null
        };
    },

    handleFilterInputChange(evt) {
        this.setState({
           filterText: evt.target.value
        });
    },

    render() {
        return (
            <div>
                <input type="text" className="form-control" placeholder="Search..." onChange={this.handleFilterInputChange} />
                <StarshipList filterText={this.state.filterText} />
            </div>
        );
    }
});