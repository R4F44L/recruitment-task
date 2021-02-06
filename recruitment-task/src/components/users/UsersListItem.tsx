import styled from 'styled-components';
import { User } from '../../interfaces/User';

const Container = styled.div`padding: 40px; margin: 40px; border 2px black solid; min-width: 200px; height: 200px; text-align:center; float: left`;

interface UsersListItemProps {
	user: User;
}

export const UsersListItem: React.FC<UsersListItemProps> = ({ user }) => {
	return (
		<>
			<Container>{user.username} Siema</Container>
		</>
	);
};
