import { useQuery } from '@apollo/client';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { PostListItem as PostListItemInterface } from '../../interfaces/Post';
import { UserDetails as UserDetailsInterface } from '../../interfaces/User';
import { PostListItem } from '../posts/PostListItem';
import { GET_USER_BY_ID } from './Queries';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { ImPlus } from 'react-icons/im';

const Container = styled.div``;
const DetailsHeader = styled.h1`
	margin: 0 0 0 0;
`;
const HeaderContainer = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const UserDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const { data, loading, error } = useQuery<{ user: UserDetailsInterface }>(GET_USER_BY_ID, {
		variables: { id },
	});
	return (
		<>
			<Container>
				<HeaderContainer>
					<AiOutlineArrowLeft style={{ fontSize: '30px' }} />
					<DetailsHeader>{data?.user.name || <Skeleton />}</DetailsHeader>
					<ImPlus style={{ fontSize: '30px' }} />
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
