import React from "react";
import Avatar from "../common/avatar/Avatar";
import { useNavigate } from "react-router-dom";
import "./UserDataBox.css";
import {StyledUserDataBoxContainer} from "./StyledUserDataBoxContainer"
import {StyledUserInfoContainer} from "./StyledUserInfoContainer"

interface UserDataBoxProps {
  name?: string;
  username?: string;
  profilePicture?: string;
  id: string;
  onClick?: () => void;
}
export const UserDataBox = ({
  name,
  username,
  profilePicture,
  id,
  onClick,
}: UserDataBoxProps) => {
  const navigate = useNavigate();

  return (
    <StyledUserDataBoxContainer onClick={onClick}>
      <Avatar
        width={"48px"}
        height={"48px"}
        src={profilePicture}
        onClick={() => onClick ?? navigate(`/profile/${id}`)}
        alt={name ?? "Name"}
      />
      <StyledUserInfoContainer>
        <p>{name ?? "Name"}</p>
        <p>{"@" + username ?? "@Username"}</p>
      </StyledUserInfoContainer>
    </StyledUserDataBoxContainer>
  );
};

export default UserDataBox;
