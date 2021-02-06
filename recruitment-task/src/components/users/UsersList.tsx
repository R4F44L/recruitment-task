import { useQuery } from '@apollo/client';
import { GET_USERS } from './Queries';
import { UsersListItem } from './UsersListItem';
import { UsersPage } from '../../interfaces/UsersPage';
import { User } from '../../interfaces/User';
import styled from 'styled-components';

const Container = styled.div``;

export const UsersList: React.FC = () => {
	const { data, loading, error } = useQuery<{ users: UsersPage }>(GET_USERS);
	return (
		<>
			<Container>
				{loading
					? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <UsersListItem key={i}></UsersListItem>)
					: data?.users.data.map((u: User) => <UsersListItem user={u} key={u.id}></UsersListItem>)}
			</Container>
		</>
	);
};
