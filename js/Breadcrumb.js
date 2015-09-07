'use strict';

import React, { PropTypes } from 'react';
import { Navigation } from 'react-router';


export default React.createClass({
    mixins: [Navigation],

    contextTypes: {
        router: PropTypes.func
    },

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
            items.push(<li><a href="#/">Inventory</a></li>);
            items.push((<li class="active">{this.props.starship.name}</li>));
        }else {
            items.push(<li>Inventory</li>);
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