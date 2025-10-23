import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData } from '@/entities/User';
import { SidebarItemType } from '../types/sidebar';
import MainIcon from '@/shared/assets/icons/main-20-20.svg';
import AboutIcon from '@/shared/assets/icons/about-20-20.svg';
import ProfileIcon from '@/shared/assets/icons/profile-20-20.svg';
import ArticleIcon from '@/shared/assets/icons/article-20-20.svg';
import {
  getRouteAbout,
  getRouteArticles,
  getRouteMain,
  getRouteProfile,
} from '@/shared/const/router';

export const getSidebarItems = createSelector(getUserAuthData, (userData) => {
  const sidebarItemsList: SidebarItemType[] = [
    {
      Icon: MainIcon,
      path: getRouteMain(),
      text: 'Главная',
    },
    {
      Icon: AboutIcon,
      path: getRouteAbout(),
      text: 'О сайте',
    },
  ];

  if (userData) {
    sidebarItemsList.push(
      {
        Icon: ProfileIcon,
        path: getRouteProfile(userData.id),
        text: 'Профиль',
        authOnly: true,
      },
      {
        Icon: ArticleIcon,
        path: getRouteArticles(),
        text: 'Статьи',
        authOnly: true,
      }
    );
  }

  return sidebarItemsList;
});
