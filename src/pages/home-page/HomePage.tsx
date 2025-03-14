import React, { useEffect } from "react";
import SuggestionBox from "./components/suggestionBox/SuggestionBox";
import ContentContainer from "./components/contentContainer/ContentContainer";
import { updateFeed } from "../../redux/user";
import { SearchBar } from "../../components/search-bar/SearchBar";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { StyledUserSuggestionContainer } from "./UserSeuggestionContainer";
import {UseGetPosts} from "../../queries/postQueries"
import {ToastType} from "../../components/toast/Toast"
import {useToast} from "../../context/ToastContext"

const HomePage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const query = useAppSelector((state) => state.user.query);
  // const service = useHttpRequestService();
  const { showToast } = useToast();


  const { data } = UseGetPosts(query, !!query)

  const handleSetUser = async () => {
    try {
      // const data = await service.getPosts(query);
      if (data) {
        dispatch(updateFeed(data));
      }
    } catch (e) {
      navigate("/sign-in");
    }
  };

  useEffect(() => {
    handleSetUser().then();
    showToast("Welcome!", ToastType.SUCCESS)
  }, []);

  return (
    <>
      <ContentContainer />
      <StyledUserSuggestionContainer>
        <SearchBar />
        <SuggestionBox />
      </StyledUserSuggestionContainer>
    </>
  );
};

export default HomePage;
