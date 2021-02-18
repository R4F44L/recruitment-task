import React, { useCallback } from 'react';
import { generatePath, useHistory } from 'react-router-dom';

import { User } from '../../interfaces/User';
import { DETAILS } from '../../shared/Strings';
import { USER_DETAILS_PATH } from '../../shared/Constants';
import {
	UserListItemContainer,
	UserListItemHeader,
	UserListItemCompanyName,
	UserListItemCompanyCatchPhrase,
	UserListItemCompanyBS,
	UserListItemButtonContainer,
	UserListItemDetailsButton,
	PhoneLink,
	EmailLink,
	SiteLink,
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
			<EmailLink href={`mailto:${user.email}`}>{user.email}</EmailLink>
			<br />
			<PhoneLink href={`tel:${user.phone}`}>{user.phone}</PhoneLink>
			<br />
			<SiteLink href={`//${user.website}`}>{user.website}</SiteLink>
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
