import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './NotificationList.module.scss';
import { useNotifications } from '../../api/notificationApi';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { NotificationItem } from '../NotificationItem/NotificationItem';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { toggleFeatures } from '@/shared/lib/features';

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo(
  (props: NotificationListProps) => {
    const { className } = props;
    const { data, isLoading } = useNotifications(null, {
      pollingInterval: 10000,
    });

    const skeleton = toggleFeatures({
      name: 'isAppRedesigned',
      on: () => Skeleton,
      off: () => SkeletonDeprecated,
    });

    if (isLoading) {
      return (
        <VStack
          gap="16"
          max
          className={classNames(cls.NotificationList, {}, [
            className,
          ])}
        >
          <Skeleton width="100%" border="8px" height="80px" />
          <Skeleton width="100%" border="8px" height="80px" />
          <Skeleton width="100%" border="8px" height="80px" />
        </VStack>
      );
    }

    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.NotificationList, {}, [className])}
      >
        {data?.map((item) => (
          <NotificationItem key={item.id} item={item} />
        ))}
      </VStack>
    );
  },
);
