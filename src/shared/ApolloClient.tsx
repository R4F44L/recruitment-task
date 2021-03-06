import { HttpLink, ApolloClient, InMemoryCache, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { API_URL } from '../env/variables';
import OpenNotification from './functions/OpenNotification';
import { ERROR_OCCURED_MESSAGE } from './Strings';
import { RedFrown } from './Styles';

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
	if (graphQLErrors) {
		OpenNotification(ERROR_OCCURED_MESSAGE, 'Please check provided data', 5, <RedFrown />);
	}

	forward(operation);
});

const httpLink = new HttpLink({
	uri: API_URL,
});

export const client = new ApolloClient({
	uri: API_URL,
	cache: new InMemoryCache(),
	link: from([errorLink, httpLink]),
});
