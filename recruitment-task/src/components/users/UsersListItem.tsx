import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import { User } from '../../interfaces/User';
import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const Container = styled.div`padding: 10px; margin: 40px; border 2px black solid; min-width: 300px; max-width:300px;  float: left`;
const UserHeader = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin: 0 0 20px 0;
`;
const UserContact = styled.div`
	color: blue;
	text-decoration: underline;
	margin: 0 0 20px 0;
`;
const UserCompanyName = styled.div``;
const UserCompanyCatchPhrase = styled.div``;
const UserCompanyBS = styled.div`
	font-weight: bold;
`;
const ButtonContainer = styled.div`
	text-align: center;
	margin: 20px 0 0 0;
`;
const DetailsButton = styled.button`padding 20px 40px 20px 40px; background-color: white; box-shadow: 4px 4px 2px -2px gray; width: 80%`;

interface UsersListItemProps {
	user?: User;
}

export const UsersListItem: React.FC<UsersListItemProps> = ({ user }) => {
	const history = useHistory();
	const detailsRedirect = useCallback(() => {
		history.push(`/user/${user?.id}/`);
	}, [user, history]);
	return (
		<>
			<Container>
				<UserHeader>{user?.name || <Skeleton />} </UserHeader>
				<UserContact>
					{user?.email || <Skeleton count={1} />} <br /> {user?.phone || <Skeleton />} <br />
					{user?.website || <Skeleton />}
				</UserContact>
				<UserCompanyName>{user?.company?.name || <Skeleton />}</UserCompanyName>
				<UserCompanyCatchPhrase>
					{user?.company?.catchPhrase || <Skeleton />}
				</UserCompanyCatchPhrase>
				<UserCompanyBS>{user?.company?.bs || <Skeleton />}</UserCompanyBS>
				<ButtonContainer onClick={detailsRedirect}>
					<DetailsButton>Details</DetailsButton>
				</ButtonContainer>
			</Container>
		</>
	);
};
