import React from 'react';
import { useQuery } from '@apollo/client';
import { Alert } from 'antd';

import { GET_USERS } from '../../components/users/Queries';
import UsersListItem from '../../components/users/UsersListItem';
import { UsersPage } from '../../interfaces/UsersPage';
import { User } from '../../interfaces/User';
import { ERROR, ERROR_OCCURED_MESSAGE } from '../../shared/Strings';
import { Container } from '../../shared/Styles';
import UsersListItemSkeleton from '../../components/users/UsersListItemSkeleton';

const UsersList: React.FC = () => {
	const { data, loading, error } = useQuery<{ users: UsersPage }>(GET_USERS);

	return (
		<Container>
			{error && <Alert message={ERROR_OCCURED_MESSAGE} description={ERROR} type="error" closable />}
			{loading
				? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
						<UsersListItemSkeleton key={i}></UsersListItemSkeleton>
				  ))
				: data?.users.data.map((u: User) => <UsersListItem user={u} key={u.id}></UsersListItem>)}
		</Container>
	);
};

export default UsersList;
