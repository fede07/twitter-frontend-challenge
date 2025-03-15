import { useEffect, useState } from 'react';
import { Post } from '../../service';
import { UseGetProfile } from '../../queries/userQueries';
import { UseGetPostById } from '../../queries/postQueries';
import Loader from '../../components/loader/Loader';
import { StyledContainer } from '../../components/common/Container';
import { StyledH5 } from '../../components/common/text';
import { StyledFeedContainer } from '../home-page/components/contentContainer/FeedContainer';
import Tweet from '../../components/tweet/Tweet';
import TweetBox from '../../components/tweet-box/TweetBox';
import CommentFeed from '../../components/feed/CommentFeed';
import { useToast } from '../../context/ToastContext';
import { ToastType } from '../../components/toast/Toast';
import {useParams} from "react-router-dom"

// interface PostPageProps {}
//
// interface PostPageState {
//   postId: string;
//   post: Post | undefined;
// }

const PostPage = () => {
  const { id: postId } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | undefined>(undefined);
  const [error, setError] = useState(false);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);

  const {
    data: user,
    isLoading: isLoadingUser,
    error: errorUser,
    isError: isErrorUser,
  } = UseGetProfile();

  const {
    data: post_,
    isLoading: isLoadingPost,
    error: errorPost,
    isError: isErrorPost,
  } = UseGetPostById(postId!);

  const fetchPost = () => {
    if (!post_ || !user) {
      setError(true);
      showToast('Error fetching post', ToastType.ERROR);
      return
    }
    setPost(post_);
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  useEffect(() => {
    setLoading(isLoadingUser || isLoadingPost);
  }, [isLoadingPost])

  if (isErrorUser ) {
    showToast(errorUser.message, ToastType.ALERT);
    return null;
  }

  if (isErrorPost) {
    showToast(errorPost.message, ToastType.ALERT);
    return null;
  }

  if(error) return null;

  if(loading) return (
    <StyledContainer justifyContent={'center'} alignItems={'center'}>
      <Loader />
    </StyledContainer>
  )

  if(!postId) {
    return (
      <StyledContainer justifyContent={'center'} alignItems={'center'}>
        <StyledH5>404</StyledH5>
        <StyledH5>Page not found</StyledH5>
      </StyledContainer>
    )
  }

  return (
    <StyledContainer borderRight={'1px solid #ebeef0'}>
      <StyledContainer
        padding={'16px'}
        borderBottom={'1px solid #ebeef0'}
        maxHeight={'53px'}
      >
        <StyledH5>Tweet</StyledH5>
      </StyledContainer>
      <StyledFeedContainer>
        {post ? (
          <>
            <Tweet post={post} />
            <StyledContainer
              borderBottom={'1px solid #ebeef0'}
              padding={'16px'}
            >
              <TweetBox parentId={postId} />
            </StyledContainer>

            <StyledContainer minHeight={'53.5vh'}>
              <CommentFeed postId={postId!} />
            </StyledContainer>
          </>
        ) : (
          <StyledContainer justifyContent={'center'} alignItems={'center'}>
            <Loader />
          </StyledContainer>
        )}
      </StyledFeedContainer>
    </StyledContainer>
  );
};

// class PostPage extends Component<PostPageProps, PostPageState> {
//   private service: HttpService['service'];
//
//   constructor(props: PostPageProps) {
//     super(props);
//
//     this.state = {
//       postId: window.location.href.split('/')[4] || '',
//       post: undefined,
//     };
//
//     this.service = new HttpService().service;
//   }
//
//   componentDidMount() {
//     this.fetchPost();
//   }
//
//   componentDidUpdate(prevProps: PostPageState, prevState: PostPageState) {
//     if (prevState.postId !== this.state.postId) {
//       this.fetchPost();
//     }
//   }
//
//   fetchPost() {
//     this.service
//       .getPostById(this.state.postId)
//       .then((res: Post) => {
//         this.setState({ post: res });
//       })
//       .catch((e: unknown) => {
//         console.log(e);
//       });
//
//     console.log(this.state.post)
//   }
//
//   render() {
//     return (
//       <StyledContainer borderRight={'1px solid #ebeef0'}>
//         <StyledContainer
//           padding={'16px'}
//           borderBottom={'1px solid #ebeef0'}
//           maxHeight={'53px'}
//         >
//           <StyledH5>Tweet</StyledH5>
//         </StyledContainer>
//         <StyledFeedContainer>
//           {this.state.post ? (
//             <>
//               <Tweet post={this.state.post} />
//               <StyledContainer
//                 borderBottom={'1px solid #ebeef0'}
//                 padding={'16px'}
//               >
//                 <TweetBox parentId={this.state.postId} />
//               </StyledContainer>
//
//               <StyledContainer minHeight={'53.5vh'}>
//                 <CommentFeed postId={this.state.postId} />
//               </StyledContainer>
//             </>
//           ) : (
//             <StyledContainer justifyContent={'center'} alignItems={'center'}>
//               <Loader />
//             </StyledContainer>
//           )}
//         </StyledFeedContainer>
//       </StyledContainer>
//     );
//   }
// }

export default PostPage;
