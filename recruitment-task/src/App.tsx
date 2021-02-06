import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { UserDetails } from './components/users/UserDetails';
import { UsersList } from './components/users/UsersList';

function App() {
	const client = new ApolloClient({
		uri: 'https://graphqlzero.almansi.me/api',
		cache: new InMemoryCache(),
	});
	return (
		<ApolloProvider client={client}>
			<Router>
				<Switch>
					<Route path="/posts">"Posts"</Route>
					<Route path="/user/:id">
						<UserDetails />
					</Route>
					<Route exact path="/">
						<UsersList></UsersList>
					</Route>
					<Route path="*">wszystko</Route>
				</Switch>
			</Router>
		</ApolloProvider>
	);
}

export default App;
