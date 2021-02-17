import styled from 'styled-components';

export const UserListItemContainer = styled.div`
	padding: 10px; 
	margin: 40px;
	border 2px black solid;
	min-width: 300px;
	max-width:300px;
	float: left`;

export const UserListItemHeader = styled.div`
	font-size: 20px;
	font-weight: bold;
	margin: 0 0 20px 0;
`;

export const UserListItemContact = styled.div`
	color: blue;
	text-decoration: underline;
	margin: 0 0 20px 0;
`;

export const UserListItemCompanyName = styled.div``;

export const UserListItemCompanyCatchPhrase = styled.div``;

export const UserListItemCompanyBS = styled.div`
	font-weight: bold;
`;

export const UserListItemButtonContainer = styled.div`
	text-align: center;
	margin: 20px 0 0 0;
`;

export const UserListItemDetailsButton = styled.button`
	padding 20px 40px 20px 40px;
	background-color: white; 
	box-shadow: 4px 4px 2px -2px gray; 
	width: 80%
`;