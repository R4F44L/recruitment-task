import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { UserDetails } from './components/users/UserDetails';
import { UsersList } from './components/users/UsersList';
import { IconContext } from 'react-icons';
import { PostDetails } from './components/posts/PostDeatils';
import 'antd/dist/antd.css';
import { onError } from '@apollo/client/link/error';
import { openNotification } from './shared/Functions';
import { FrownOutlined } from '@ant-design/icons';
const AppContainer = styled.div`
	width: 90%;
	margin: 50px auto 0px auto;
`;

// otypowanie
// jakikolwiek test?

function App() {
	const errorLink = onError(({ graphQLErrors, operation, forward }) => {
		if (graphQLErrors) {
			openNotification(
				'Error occured',
				'Please check provided data',
				5,
				<FrownOutlined style={{ color: 'red' }} />
			);
		}

		forward(operation);
	});
	const httpLink = new HttpLink({
		uri: 'https://graphqlzero.almansi.me/api',
	});

	const client = new ApolloClient({
		uri: 'https://graphqlzero.almansi.me/api',
		cache: new InMemoryCache(),
		link: from([errorLink, httpLink]),
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
							<Route path="*" component={UsersList} />
						</Switch>
					</Router>
				</AppContainer>
			</IconContext.Provider>
		</ApolloProvider>
	);
}

export default App;
