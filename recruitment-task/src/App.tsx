import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { UserDetails } from './components/users/UserDetails';
import { UsersList } from './components/users/UsersList';
import { IconContext } from 'react-icons';
import { PostDetails } from './components/posts/PostDeatils';

const AppContainer = styled.div`
	width: 90%;
	margin: 50px auto 0px auto;
`;

function App() {
	const client = new ApolloClient({
		uri: 'https://graphqlzero.almansi.me/api',
		cache: new InMemoryCache(),
	});
	return (
		<ApolloProvider client={client}>
			<IconContext.Provider value={{ color: 'blue' }}>
				<AppContainer>
					<Router>
						<Switch>
							<Route exact path="/user/:id" component={UserDetails} />
							<Route path="/user/:id/:postId" component={PostDetails} />
							<Route exact path="/" component={UsersList} />
							<Route path="*">wszystko</Route>
						</Switch>
					</Router>
				</AppContainer>
			</IconContext.Provider>
		</ApolloProvider>
	);
}

export default App;
