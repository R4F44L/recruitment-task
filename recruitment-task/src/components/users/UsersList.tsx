import { useQuery } from '@apollo/client';
import { GET_USERS } from './Queries';
import Skeleton from 'react-loading-skeleton';
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
				{loading ? (
					<Skeleton count={10}></Skeleton>
				) : (
					data?.users.data.map((u: User, index: number) => (
						<>
							{index % 4 === 0 && index !== 0 ? <br /> : <></>}
							<UsersListItem user={u} key={u.id}></UsersListItem>
						</>
					))
				)}
			</Container>
		</>
	);
};
