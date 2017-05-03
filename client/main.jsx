import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '/node_modules/react-nouislider/example/nouislider.css'

import App from '../imports/ui/App.jsx';

Meteor.startup(() => {
    render(<App />, document.getElementById('root'));
});
