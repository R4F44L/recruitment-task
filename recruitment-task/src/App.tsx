import { ApolloClient, from, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { IconContext } from 'react-icons';
import { onError } from '@apollo/client/link/error';
import { FrownOutlined } from '@ant-design/icons';

import styled from 'styled-components';
import 'antd/dist/antd.css';

import OpenNotification from './shared/functions/OpenNotification';
import { API_URL } from './env/variables';
import { Routing } from './shared/Routing';

const AppContainer = styled.div`
	width: 90%;
	margin: 50px auto 0px auto;
`;

const App = () => {
	const errorLink = onError(({ graphQLErrors, operation, forward }) => {
		if (graphQLErrors) {
			OpenNotification(
				'Error occured',
				'Please check provided data',
				5,
				<FrownOutlined style={{ color: 'red' }} />
			);
		}

		forward(operation);
	});
	const httpLink = new HttpLink({
		uri: API_URL,
	});

	const client = new ApolloClient({
		uri: API_URL,
		cache: new InMemoryCache(),
		link: from([errorLink, httpLink]),
	});
	return (
		<ApolloProvider client={client}>
			<IconContext.Provider value={{ color: 'blue' }}>
				<AppContainer>
					<Routing />
				</AppContainer>
			</IconContext.Provider>
		</ApolloProvider>
	);
};

export default App;
