import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import {
  Button,
  ButtonSize,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import cls from './Sidebar.module.scss';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { VStack } from '@/shared/ui/deprecated/Stack';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);

  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(() => {
    return sidebarItemsList.map((item) => (
      <SidebarItem
        key={item.path}
        item={item}
        collapsed={collapsed}
      />
    ));
  }, [collapsed, sidebarItemsList]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      off={
        <aside
          data-testid="sidebar"
          className={classNames(
            cls.Sidebar,
            { [cls.collapsed]: collapsed },
            [className],
          )}
        >
          <Button
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={cls.collapseBtn}
            theme={ButtonTheme.BACKGROUND_INVERTED}
            size={ButtonSize.L}
            square
          >
            {collapsed ? '>' : '<'}
          </Button>
          <VStack role="navigation" gap="8" className={cls.items}>
            {itemsList}
          </VStack>
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={cls.lang} />
          </div>
        </aside>
      }
      on={
        <aside
          data-testid="sidebar"
          className={classNames(
            cls.SidebarRedesigned,
            { [cls.collapsedRedesigned]: collapsed },
            [className],
          )}
        >
          <AppLogo
            size={collapsed ? 30 : 50}
            className={cls.appLogo}
          />
          <VStack role="navigation" gap="8" className={cls.items}>
            {itemsList}
          </VStack>
          <Icon
            data-testid="sidebar-toggle"
            onClick={onToggle}
            className={cls.collapseBtn}
            Svg={ArrowIcon}
            clickable
          />
          <div className={cls.switchers}>
            <ThemeSwitcher />
            <LangSwitcher short={collapsed} className={cls.lang} />
          </div>
        </aside>
      }
    />
  );
});
