import { useTranslation } from 'react-i18next';
import { memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleSortSelector.module.scss';
import { Select, SelectOptions } from '@/shared/ui/deprecated/Select';
import { SortOrder } from '@/shared/types/sort';
import { ArticleSortField } from '@/entities/Article';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text/Text';

interface ArticleSortSelectorProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onChangeOrder: (newOrder: SortOrder) => void;
  onChangeSort: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelector = memo(
  (props: ArticleSortSelectorProps) => {
    const { className, onChangeOrder, onChangeSort, order, sort } =
      props;
    const { t } = useTranslation();

    const orderOptions = useMemo<SelectOptions<SortOrder>[]>(
      () => [
        {
          value: 'asc',
          content: t('возростанию'),
        },
        {
          value: 'desc',
          content: t('убыванию'),
        },
      ],
      [t],
    );

    const sortFieldOptions = useMemo<
      SelectOptions<ArticleSortField>[]
    >(
      () => [
        {
          value: ArticleSortField.CREATED,
          content: t('дате создания'),
        },
        {
          value: ArticleSortField.TITLE,
          content: t('названию'),
        },
        {
          value: ArticleSortField.VIEWS,
          content: t('количеству просмотров'),
        },
      ],
      [t],
    );

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <div
            className={classNames(cls.ArticleSortSelectorRedesigned, {}, [
              className,
            ])}
          >
            <VStack gap='8' >
              <Text text={t('Сортировать по:')} />
              <ListBox
                value={sort}
                onChange={onChangeSort}
                items={sortFieldOptions}
              />
              <ListBox
                value={order}
                onChange={onChangeOrder}
                items={orderOptions}
              />
            </VStack>
          </div>
        }
        off={
          <div
            className={classNames(cls.ArticleSortSelector, {}, [
              className,
            ])}
          >
            <Select<ArticleSortField>
              value={sort}
              onChange={onChangeSort}
              options={sortFieldOptions}
              label={t('Сортировать ПО')}
            />
            <Select<SortOrder>
              value={order}
              onChange={onChangeOrder}
              options={orderOptions}
              label={t('по')}
              className={cls.order}
            />
          </div>
        }
      />
    );
  },
);
