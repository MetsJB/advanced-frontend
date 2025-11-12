import { CSSProperties, useMemo } from 'react';
import {
  classNames,
  Mods,
} from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';
import { AppImage } from '../AppImage';
import UserIcon from '../../assets/icons/user-filled.svg';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  size?: number;
  alt?: string;
  fallbackInverted?: boolean;
}

export const Avatar = ({
  alt,
  className,
  fallbackInverted,
  src,
  size = 100,
}: AvatarProps) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size,
      height: size,
    };
  }, [size]);

  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      Svg={UserIcon}
      width={size}
      height={size}
    />
  );
  const fallback = (
    <Skeleton width={size} height={size} border="50%" />
  );

  return (
    <AppImage
      fallback={fallback}
      errorFallback={errorFallback}
      alt={alt}
      src={src}
      style={styles}
      className={classNames(cls.Avatar, mods, [className])}
    />
  );
};
