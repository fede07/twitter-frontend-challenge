import React, { useState } from 'react';
import { StyledTweetContainer } from './TweetContainer';
import AuthorData from './user-post-data/AuthorData';
import type { Post, User } from '../../service';
import { StyledReactionsContainer } from './ReactionsContainer';
import Reaction from './reaction/Reaction';
import { useHttpRequestService } from '../../service/HttpRequestService';
import { IconType } from '../icon/Icon';
import { StyledContainer } from '../common/Container';
import ThreeDots from '../common/ThreeDots';
import DeletePostModal from './delete-post-modal/DeletePostModal';
import ImageContainer from './tweet-image/ImageContainer';
import CommentModal from '../comment/comment-modal/CommentModal';
import { useNavigate } from 'react-router-dom';
import { UseGetPostById } from '../../queries/postQueries';
import { S3Service } from '../../service/S3Service';

interface TweetProps {
  post: Post;
  user?: User;
  ref?: React.MutableRefObject<HTMLDivElement | null> | null;
}

const Tweet = ({post, user}: TweetProps) => {
  const [actualPost, setActualPost] = useState<Post>(post);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showCommentModal, setShowCommentModal] = useState<boolean>(false);
  const service = useHttpRequestService();
  const navigate = useNavigate();
  const s3 = S3Service;
  // const getCountByType = (type: string): number => {
  //   return actualPost?.reactions?.filter((r) => r.type === type).length ?? 0;
  // };

  const imagesUrls = post.images?.length
    ? post.images?.map((image: string) => s3.getPublicUrl(image))
    : [];

  const handleReaction = async (type: string) => {
    if (!actualPost.reactions) {
      actualPost.reactions = [];
    }

    const reacted = actualPost.reactions.find(
      (r) => r.type === type && r.userId === user?.id
    );
    if (reacted) {
      await service.deleteReaction(reacted.id);
    } else {
      await service.createReaction(actualPost.id, type);
    }
    // const newPost = await service.getPostById(post.id);
    const newPost = UseGetPostById(post.id).data;
    setActualPost(newPost);
  };

  const hasReactedByType = (type: string): boolean => {
    if (!actualPost.reactions) {
      return false;
    }

    return actualPost.reactions.some(
      (r) => r.type === type && r.userId === user?.id
    );
  };

  return (
    <StyledTweetContainer>
      <StyledContainer
        style={{ width: '100%' }}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}
        maxHeight={'48px'}
      >
        <AuthorData
          id={post.author.id}
          name={post.author.name ?? post.author.username}
          username={post.author.username}
          createdAt={post.createdAt}
          profilePicture={
            post.author.profilePicture ? post.author.profilePicture : undefined
          }
        />
        {post.authorId === user?.id && (
          <>
            <DeletePostModal
              show={showDeleteModal}
              id={post.id}
              onClose={() => {
                setShowDeleteModal(false);
              }}
            />
            <ThreeDots
              onClick={() => {
                setShowDeleteModal(!showDeleteModal);
              }}
            />
          </>
        )}
      </StyledContainer>
      <StyledContainer onClick={() => navigate(`/post/${post.id}`)}>
        <p>{post.content}</p>
      </StyledContainer>
      {post.images && post.images!.length > 0 && (
        <StyledContainer padding={'0 0 0 10%'}>
          <ImageContainer images={imagesUrls} />
        </StyledContainer>
      )}
      <StyledReactionsContainer>
        <Reaction
          img={IconType.CHAT}
          count={actualPost?.qtyComments ?? 0}
          reactionFunction={() =>
            window.innerWidth > 600
              ? setShowCommentModal(true)
              : navigate(`/compose/comment/${post.id}`)
          }
          increment={0}
          reacted={false}
        />
        <Reaction
          img={IconType.RETWEET}
          count={actualPost?.qtyReactions ?? 0}
          reactionFunction={() => handleReaction('RETWEET')}
          increment={1}
          reacted={hasReactedByType('RETWEET')}
        />
        <Reaction
          img={IconType.LIKE}
          count={actualPost?.qtyLikes ?? 0}
          reactionFunction={() => handleReaction('LIKE')}
          increment={1}
          reacted={hasReactedByType('LIKE')}
        />
      </StyledReactionsContainer>
      <CommentModal
        show={showCommentModal}
        post={post}
        onClose={() => setShowCommentModal(false)}
      />
    </StyledTweetContainer>
  );
};

export default Tweet;
