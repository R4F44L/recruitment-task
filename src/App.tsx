import { ApolloProvider } from '@apollo/client';
import { IconContext } from 'react-icons';

import styled from 'styled-components';
import 'antd/dist/antd.css';
import { Routing } from './shared/Routing';
import { client } from './shared/ApolloClient';

const AppContainer = styled.div`
	width: 90%;
	margin: 50px auto 0px auto;
`;

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
