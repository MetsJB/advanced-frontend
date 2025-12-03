import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown as DropdownDeprecated } from '@/shared/ui/deprecated/Popups';
import { Avatar as AvatarDeprecated} from '@/shared/ui/deprecated/Avatar';
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import {
  getRouteAdmin,
  getRouteProfile,
} from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { Dropdown } from '@/shared/ui/redesigned/Popups';
import { Avatar } from '@/shared/ui/redesigned/Avatar';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const authData = useSelector(getUserAuthData);
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
  const isAdminPanelAvailable = isAdmin || isManager;
  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  if (!authData) {
    return null;
  }

  const items = [
    ...(isAdminPanelAvailable
      ? [
          {
            content: t('Админка'),
            href: getRouteAdmin(),
          },
        ]
      : []),

    {
      content: t('Профиль'),
      href: getRouteProfile(authData.id),
    },
    {
      content: t('Выйти'),
      onClick: onLogout,
    },
  ];

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Dropdown
          className={classNames('', {}, [className])}
          direction="bottom left"
          trigger={
            <Avatar
              size={40}
              src={authData.avatar}
            />
          }
          items={items}
        />
      }
      off={
        <DropdownDeprecated
          className={classNames('', {}, [className])}
          direction="bottom left"
          trigger={
            <AvatarDeprecated
              fallbackInverted
              size={30}
              src={authData.avatar}
            />
          }
          items={items}
        />
      }
    />
  );
});
