import LogoutPrompt from '../navbar/logout-prompt/LogoutPrompt';
import {
  StyledLogoutPrompt,
  StyledProfileLogoutPromptContainer,
} from './StyledProfileLogoutPromptContainer';
import React, { useEffect, useState } from 'react';
import icon from '../../assets/icon.jpg';
import { StyledP } from '../common/text';
import { StyledContainer } from '../common/Container';
import { useUser } from '../../context/UserContext';
import { S3Service } from '../../service/S3Service';
// import ModalWrapper from '../modal-wrapper/ModalWrapper';

interface ProfileLogoutPromptProps {
  margin: string;
  direction: string;
}

const ProfileLogoutPrompt = ({
  margin,
  direction,
}: ProfileLogoutPromptProps) => {
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [userProfilePicture, setUserProfilePicture] = useState('');
  // const service = useHttpRequestService()
  const { user } = useUser();

  useEffect(() => {
    if (user?.profilePicture) {
      setUserProfilePicture(S3Service.getPublicUrl(user?.profilePicture));
    }
  }, [user]);

  // useEffect(() => {
  //     handleGetUser().then(r => setUser(r))
  // }, []);
  //
  // const handleGetUser = async () => {
  //     return await service.me()
  // }

  const handleLogout = () => {
    setLogoutOpen(!logoutOpen);
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <StyledContainer
      maxHeight={'48px'}
      flexDirection={'row'}
      className={'profile-info'}
      alignItems={'center'}
      gap={'8px'}
      onClick={handleLogout}
      cursor={'pointer'}
    >
      <StyledProfileLogoutPromptContainer direction={direction}>
        <img
          src={user?.profilePicture ? userProfilePicture : icon}
          className="icon"
          alt="Icon"
        />
        {logoutOpen && (
            <StyledLogoutPrompt
              margin={margin}
              onClick={(event) => handleButtonClick(event)}
            >
              {/*<ModalWrapper show={logoutOpen} onClose={handleLogout}>*/}
                <LogoutPrompt show={logoutOpen} />
              {/*</ModalWrapper>*/}
            </StyledLogoutPrompt>
        )}
      </StyledProfileLogoutPromptContainer>
      <StyledContainer padding={'4px 0'} gap={'4px'} className={'user-info'}>
        <StyledP primary hidden={true}>{user?.name}</StyledP>
        <StyledP primary={false} hidden={true}>{`@${user?.username}`}</StyledP>
      </StyledContainer>
    </StyledContainer>
  );
};

export default ProfileLogoutPrompt;
