import React, { useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';
import { generatePath, useHistory } from 'react-router-dom';

import { User } from '../../interfaces/User';
import { DETAILS } from '../../shared/Strings';
import { USER_DETAILS_PATH } from '../../shared/Constants';
import {
	UserListItemContainer,
	UserListItemHeader,
	UserListItemContact,
	UserListItemCompanyName,
	UserListItemCompanyCatchPhrase,
	UserListItemCompanyBS,
	UserListItemButtonContainer,
	UserListItemDetailsButton,
} from './Styles';

interface UsersListItemProps {
	user: User;
}

const UsersListItem: React.FC<UsersListItemProps> = ({ user }) => {
	const history = useHistory();
	const detailsRedirect = useCallback(() => {
		history.push(generatePath(USER_DETAILS_PATH, { id: user.id }));
	}, [user, history]);

	return (
		<UserListItemContainer>
			<UserListItemHeader>{user.name} </UserListItemHeader>
			<UserListItemContact>
				{user.email} <br /> {user.phone} <br />
				{user.website}
			</UserListItemContact>
			<UserListItemCompanyName>{user.company?.name}</UserListItemCompanyName>
			<UserListItemCompanyCatchPhrase>{user.company?.catchPhrase}</UserListItemCompanyCatchPhrase>
			<UserListItemCompanyBS>{user.company?.bs}</UserListItemCompanyBS>
			<UserListItemButtonContainer onClick={detailsRedirect}>
				<UserListItemDetailsButton>{DETAILS}</UserListItemDetailsButton>
			</UserListItemButtonContainer>
		</UserListItemContainer>
	);
};

export default React.memo(UsersListItem);
