import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Post } from '../../interfaces/Post';
import { UserDetails as UserDetailsInterface } from '../../interfaces/User';
import { GET_USER_BY_ID } from './Queries';

const DetailsHeader = styled.h1``;
const Container = styled.div``;
export const UserDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { data, loading, error } = useQuery<{ user: UserDetailsInterface }>(GET_USER_BY_ID, {
		variables: { id },
	});
	return (
		<>
			<Container>
				cofajka
				<DetailsHeader>{data?.user.name || <Skeleton />}</DetailsHeader>
				dodawajka
				{data?.user.posts?.data.map((p: Post) => p.title)}
			</Container>
		</>
	);
};
