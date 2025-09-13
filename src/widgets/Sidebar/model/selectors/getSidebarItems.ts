import { createSelector } from "@reduxjs/toolkit";
import { getUserAuthData } from "entities/User";
import { SidebarItemType } from "../types/sidebar";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import AboutIcon from "shared/assets/icons/about-20-20.svg";
import ProfileIcon from "shared/assets/icons/profile-20-20.svg";
import ArticleIcon from "shared/assets/icons/article-20-20.svg";
import { RoutePath } from "shared/config/routerConfig/routerConfig";

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      Icon: MainIcon,
      path: RoutePath.main,
      text: "Главная",
    },
    {
      Icon: AboutIcon,
      path: RoutePath.about,
      text: "О сайте",
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        Icon: ProfileIcon,
        path: RoutePath.profile + userData?.id,
        text: "Профиль",
        authOnly: true,
      },
      {
        Icon: ArticleIcon,
        path: RoutePath.articles,
        text: "Статьи",
        authOnly: true,
      }
    );
  }

  return sidebarItemsList;
});
