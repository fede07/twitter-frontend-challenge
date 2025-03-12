import React, { ChangeEvent, useState } from 'react';
import Button from '../button/Button';
import TweetInput from '../tweet-input/TweetInput';
import { setLength, updateFeed } from '../../redux/user';
import ImageContainer from '../tweet/tweet-image/ImageContainer';
import { BackArrowIcon } from '../icon/Icon';
import ImageInput from '../common/ImageInput';
import { useTranslation } from 'react-i18next';
import { ButtonType } from '../button/StyledButton';
import { StyledTweetBoxContainer } from './TweetBoxContainer';
import { StyledContainer } from '../common/Container';
import { StyledButtonContainer } from './ButtonContainer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useUser } from '../../context/UserContext';
import { UseGetPosts } from '../../queries/postQueries';
import { useHttpRequestService } from '../../service/HttpRequestService';
import { useToast } from '../../context/ToastContext';
import { ToastType } from '../toast/Toast';

interface TweetBoxProps {
  parentId?: string;
  onClose?: () => void;
  mobile?: boolean;
  borderless?: boolean;
}

const TweetBox: React.FC<TweetBoxProps> = ({ parentId, onClose, mobile, borderless }) => {
  const [content, setContent] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);

  const { length, query } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const service = useHttpRequestService();
  const { user } = useUser()
  const { showToast } = useToast()

  const { refetch } = UseGetPosts(query);

  // useEffect(() => {
  //   handleGetUser().then(setUser);
  // }, []);
  //
  // const handleGetUser = async (): Promise<User> => {
  //   return await service.me();
  // };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
  };

  const handleSubmit = async () => {

    try {
      await service.createPost({content, images, parentId: parentId ? parentId : undefined})
      setContent("");
      setImages([]);
      setImagesPreview([]);
      dispatch(setLength(length + 1));
      const { data: posts } = await refetch();
      dispatch(updateFeed(posts));
      onClose && onClose();
      showToast("Tweet created!", ToastType.SUCCESS)
    } catch (e) {
      showToast(e instanceof Error ? e.message : "An unexpected error occurred", ToastType.ALERT)
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, idx) => idx !== index);
    const newImagesPreview = newImages.map((i) => URL.createObjectURL(i));
    setImages(newImages);
    setImagesPreview(newImagesPreview);
  };

  const handleAddImage = (newImages: File[]) => {
    setImages(newImages);
    const newImagesPreview = newImages.map((i) => URL.createObjectURL(i));
    setImagesPreview(newImagesPreview);
  };

  return (
    <StyledTweetBoxContainer>
      {mobile && (
        <StyledContainer
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <BackArrowIcon onClick={onClose} />
          <Button
            text="Tweet"
            buttonType={ButtonType.DEFAULT}
            size="SMALL"
            onClick={handleSubmit}
            disabled={content.length === 0}
          />
        </StyledContainer>
      )}
      <StyledContainer style={{ width: "100%" }}>
        <TweetInput
          onChange={handleChange}
          maxLength={240}
          placeholder={t("placeholder.tweet")}
          value={content}
          src={user?.profilePicture}
          alt={user?.name}
        />
        <StyledContainer padding="0 0 0 10%">
          <ImageContainer
            editable
            images={imagesPreview}
            removeFunction={handleRemoveImage}
          />
        </StyledContainer>
        <StyledButtonContainer>
          <ImageInput setImages={handleAddImage} parentId={parentId} />
          {!mobile && (
            <Button
              text="Tweet"
              buttonType={ButtonType.DEFAULT}
              size="SMALL"
              onClick={handleSubmit}
              disabled={
                content.length <= 0 ||
                content.length > 240 ||
                images.length > 4
              }
            />
          )}
        </StyledButtonContainer>
      </StyledContainer>
    </StyledTweetBoxContainer>
  );
};

export default TweetBox;
