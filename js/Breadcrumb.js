'use strict';

import React, { PropTypes } from 'react';


export default React.createClass({
    getDefaultProps: function () {
        return {
            starship: null
        };
    },

    getInitialState: function () {
        return {};
    },

    renderNavItems: function() {
        var items = [];

        if(this.props.starship) {
            items.push(<li key="0"><a href="#/">Inventory</a></li>);
            items.push((<li key="1" className="active">{this.props.starship.name}</li>));
        }else {
            items.push(<li key="0">Inventory</li>);
        }

        return items;
    },

    render() {
        return (
            <ol className="breadcrumb">
                {this.renderNavItems()}
            </ol>
        );
    }
});