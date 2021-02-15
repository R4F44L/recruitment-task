import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import PostDetails from '../components/posts/PostDetails';
import UserDetails from '../components/users/UserDetails';
import UsersList from '../components/users/UsersList';

export const Routing: React.FC = () => {
	return (
		<Router>
			<Switch>
				<Route exact path="/user/:id" component={UserDetails} />
				<Route path="/user/:id/:postId" component={PostDetails} />
				<Route exact path="/" component={UsersList} />
				<Route path="*" component={UsersList} />
			</Switch>
		</Router>
	);
};
