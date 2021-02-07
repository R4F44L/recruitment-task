import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostListItem as PostListItemInterface } from '../../interfaces/Post';
import { UserDetails as UserDetailsInterface } from '../../interfaces/User';
import { PostListItem } from '../posts/PostListItem';
import { GET_USER_BY_ID } from './Queries';
import { ImPlus } from 'react-icons/im';
import { useCallback } from 'react';
import { IdParam } from '../../shared/Interfaces';
import { BackArrow } from '../../shared/BackArrow';

const Container = styled.div``;
const DetailsHeader = styled.h1`
	margin: 0 0 0 0;
	height: 100%;
	width: 100%;
	text-align: center;
`;
const HeaderContainer = styled.div`
	display: flex;
	width: 100%;
	justify-content: space-between;
`;

export const UserDetails: React.FC = () => {
	const { id } = useParams<IdParam>();
	const { data, loading, error } = useQuery<{ user: UserDetailsInterface }>(GET_USER_BY_ID, {
		variables: { id },
	});

	const createPost = useCallback(() => {
		console.log('create');
	}, []);

	return (
		<>
			<Container>
				<HeaderContainer>
					<BackArrow url={'/'} />
					<DetailsHeader>{data?.user.name || <Skeleton />}</DetailsHeader>
					<ImPlus style={{ fontSize: '30px', marginTop: '5px' }} onClick={createPost} />
				</HeaderContainer>
				{loading
					? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => <PostListItem key={i} />)
					: data?.user.posts?.data.map((p: PostListItemInterface) => (
							<PostListItem post={p} key={p.id} />
					  ))}
			</Container>
		</>
	);
};
