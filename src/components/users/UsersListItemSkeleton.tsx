import React from 'react';
import Skeleton from 'react-loading-skeleton';

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

const UsersListItemSkeleton: React.FC = () => {
	return (
		<UserListItemContainer>
			<UserListItemHeader>
				<Skeleton />
			</UserListItemHeader>
			<UserListItemContact>
				<Skeleton count={1} /> <br /> <Skeleton /> <br />
				<Skeleton />
			</UserListItemContact>
			<UserListItemCompanyName>
				<Skeleton />
			</UserListItemCompanyName>
			<UserListItemCompanyCatchPhrase>
				<Skeleton />
			</UserListItemCompanyCatchPhrase>
			<UserListItemCompanyBS>
				<Skeleton />
			</UserListItemCompanyBS>
			<UserListItemButtonContainer>
				<UserListItemDetailsButton>
					<Skeleton />
				</UserListItemDetailsButton>
			</UserListItemButtonContainer>
		</UserListItemContainer>
	);
};

export default React.memo(UsersListItemSkeleton);
