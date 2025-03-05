import React from "react";
import { StyledAvatarContainer } from "./AvatarContainer";
import NameImage from "./NameImage";
import {S3Service} from "../../../service/S3Service"
import Icon from "../../../assets/icon.jpg";


interface AvatarProps {
  src?: string;
  alt?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
}

const Avatar = ({ src, alt, onClick, width, height }: AvatarProps) => {

  const srcUrl = src ? S3Service.getPublicUrl(src) : '';

  return (
    <StyledAvatarContainer onClick={onClick} width={width} height={height}>
      {src === Icon || src === undefined ? <NameImage name={alt ?? ''} /> :  <img src={srcUrl} alt={alt ?? ''} />}
    </StyledAvatarContainer>
  );
};
export default Avatar;
