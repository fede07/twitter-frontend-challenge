import React ,{useEffect ,useState} from "react";
import Tab from "./tab/Tab";
import { setQuery, updateFeed } from "../../../../../redux/user";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../../../redux/hooks";
import { StyledTabBarContainer } from "./TabBarContainer";
import {UseGetPosts} from "../../../../../queries/postQueries"

const TabBar = () => {
  const [activeFirstPage, setActiveFirstPage] = useState(true);
  const dispatch = useAppDispatch();
  // const service = useHttpRequestService();
  const { t } = useTranslation();

  const [query_, setQuery_] = useState<string>("");
  const { data, isLoading } = UseGetPosts(query_, !!query_)

  const handleClick = async (value: boolean, query: string) => {
    setActiveFirstPage(value);
    setQuery_(query);
    dispatch(setQuery(query));
    try {
      if (data && !isLoading) {
        dispatch(updateFeed(data));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (data && !isLoading) {
        dispatch(updateFeed(data));
      }
    } catch (e) {
      console.log(e);
    }
  } ,[data, dispatch, isLoading]);

  return (
    <>
      <StyledTabBarContainer>
        <Tab
          active={activeFirstPage}
          text={t("header.for-you")}
          onClick={() => handleClick(true, "")}
        />
        <Tab
          active={!activeFirstPage}
          text={t("header.following")}
          onClick={() => handleClick(false, "following")}
        />
      </StyledTabBarContainer>
    </>
  );
};

export default TabBar;
