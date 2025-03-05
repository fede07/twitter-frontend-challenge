import React, { useEffect, useState } from "react";
import FollowUserBox from "../../../../components/follow-user/FollowUserBox";
import { useTranslation } from "react-i18next";
import { User } from "../../../../service";
import { StyledSuggestionBoxContainer } from "./SuggestionBoxContainer";
import {UseGetRecommendedUsers} from "../../../../queries/userQueries"

const SuggestionBox = () => {
  const [users, setUsers] = useState<User[]>([]);
  // const httpService = useHttpRequestService();
  const { t } = useTranslation();

  const {data: recommendedUsers} = UseGetRecommendedUsers(6, 0)

  useEffect(() => {
    try {
      // httpService.getRecommendedUsers(6, 0).then((res) => {
      //   setUsers(res);
      if (recommendedUsers) {
        setUsers(recommendedUsers);
      }
    } catch (e) {
      console.log(e);
    }
  }, [recommendedUsers]);

  return (
    <StyledSuggestionBoxContainer>
      <h6>{t("suggestion.who-to-follow")}</h6>
      {users.length > 0 ? (
        users
          .filter((value, index, array) => {
            return array.indexOf(value) === index;
          })
          .slice(0, 5)
          .map((user) => (
            <FollowUserBox
              key={user.id}
              id={user.id}
              name={user.name? user.name : user.username}
              username={user.username}
              profilePicture={user.profilePicture}
            />
          ))
      ) : (
        <p>{t("suggestion.no-recommendations")}</p>
      )}
      {users.length > 5 && (
        <a href="/recommendations">{t("suggestion.show-more")}</a>
      )}
    </StyledSuggestionBoxContainer>
  );
};

export default SuggestionBox;
