import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import PostDetails from '../pages/posts/PostDetails';
import UserDetails from '../pages/users/UserDetails';
import UsersList from '../pages/users/UsersList';
import { ROOT_PATH, USER_DETAILS_PATH, POST_DETAILS_PATH, WILDCARD_PATH } from './Constants';

export const Routing: React.FC = () => (
	<Router>
		<Switch>
			<Route exact path={USER_DETAILS_PATH} component={UserDetails} />
			<Route path={POST_DETAILS_PATH} component={PostDetails} />
			<Route exact path={ROOT_PATH} component={UsersList} />
			<Route path={WILDCARD_PATH} component={UsersList} />
		</Switch>
	</Router>
);
