import React from "react";
import { StyledAvatarContainer } from "./AvatarContainer";
import {S3Service} from "../../../service/S3Service"
import {DEFAULT_AVATAR} from "../../../util/Constants"

interface AvatarProps {
  src?: string;
  alt?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
}

const Avatar = ({ src, alt, onClick, width, height }: AvatarProps) => {

  const srcUrl = src ? S3Service.getPublicUrl(src) : DEFAULT_AVATAR;

  return (
    <StyledAvatarContainer onClick={onClick} width={width} height={height}>
      <img src={srcUrl} alt={alt ?? ''} />
    </StyledAvatarContainer>
  );
};
export default Avatar;
