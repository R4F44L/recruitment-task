import React, { useCallback } from 'react';
import Skeleton from 'react-loading-skeleton';

import { User } from '../../interfaces/User';
import { generatePath, useHistory } from 'react-router-dom';
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
	user?: User;
}

const UsersListItem: React.FC<UsersListItemProps> = ({ user }) => {
	const history = useHistory();
	const detailsRedirect = useCallback(() => {
		if (user) history.push(generatePath(USER_DETAILS_PATH, { id: user?.id }));
	}, [user, history]);

	return (
		<>
			<UserListItemContainer>
				<UserListItemHeader>{user?.name || <Skeleton />} </UserListItemHeader>
				<UserListItemContact>
					{user?.email || <Skeleton count={1} />} <br /> {user?.phone || <Skeleton />} <br />
					{user?.website || <Skeleton />}
				</UserListItemContact>
				<UserListItemCompanyName>{user?.company?.name || <Skeleton />}</UserListItemCompanyName>
				<UserListItemCompanyCatchPhrase>
					{user?.company?.catchPhrase || <Skeleton />}
				</UserListItemCompanyCatchPhrase>
				<UserListItemCompanyBS>{user?.company?.bs || <Skeleton />}</UserListItemCompanyBS>
				<UserListItemButtonContainer onClick={detailsRedirect}>
					<UserListItemDetailsButton>{DETAILS}</UserListItemDetailsButton>
				</UserListItemButtonContainer>
			</UserListItemContainer>
		</>
	);
};

export default React.memo(UsersListItem);
