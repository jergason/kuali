'use strict';

import React from 'react';
import Router, { Route } from 'react-router';

import StarshipDirectory from './StarshipDirectory';
import StarshipDetail from './StarshipDetail';

import 'bootstrap/dist/css/bootstrap.min.css';

import '../style.css';

var routes = (
    <Route>
        <Route name="home" path="/" handler={StarshipDirectory}/>
        <Route name="detail" path="/detail/:starship_id" handler={StarshipDetail}/>
    </Route>
);

Router.run(routes, (Handler) => {
    React.render(<Handler/>,  document.querySelector('.app'));
});