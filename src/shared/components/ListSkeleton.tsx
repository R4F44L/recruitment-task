import React from 'react';

export interface PostListSkeletonProps {
	range: number;
	component: React.FC;
}

const PostListSkeleton: React.FC<PostListSkeletonProps> = ({ range, component: Component }) => {
	return (
		<>
			{Array.from({ length: range }, (_, i) => i).map((i) => (
				<Component key={i} />
			))}
		</>
	);
};

export default React.memo(PostListSkeleton);
