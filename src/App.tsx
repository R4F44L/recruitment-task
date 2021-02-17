import React from 'react';
import { IconContext } from 'react-icons';

import { ApolloProvider } from '@apollo/client';
import 'antd/dist/antd.css';

import { Routing } from './shared/Routing';
import { client } from './shared/ApolloClient';
import { AppContainer } from './shared/StyledComponents';

const App = () => {
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
