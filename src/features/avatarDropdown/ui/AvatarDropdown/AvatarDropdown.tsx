import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Dropdown } from '@/shared/ui/Popups';
import { Avatar } from '@/shared/ui/Avatar';
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

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo(
  (props: AvatarDropdownProps) => {
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

    return (
      <Dropdown
        className={classNames('', {}, [className])}
        direction="bottom left"
        trigger={
          <Avatar
            fallbackInverted
            size={30}
            src={authData.avatar}
          />
        }
        items={[
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
        ]}
      />
    );
  },
);
