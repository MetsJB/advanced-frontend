import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./SidebarItem.module.scss";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routerConfig/routerConfig";
import MainIcon from "shared/assets/icons/main-20-20.svg";
import { SidebarItemType } from "../../model/types/sidebar";
import { memo } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entites/User";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

export const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);

  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      theme={AppLinkTheme.SECONDARY}
      to={item.path}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
    >
      <item.Icon className={classNames(cls.icon)} />
      <span className={classNames(cls.link)}>{t(item.text)}</span>
    </AppLink>
  );
});
