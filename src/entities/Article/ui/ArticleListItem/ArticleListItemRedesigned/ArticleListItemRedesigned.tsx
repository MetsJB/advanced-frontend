import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleListItemRedesigned.module.scss';
import { ArticleListItemProps } from '../ArticleListItem';
import { getRouteArticleDetails } from '@/shared/const/router';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Text } from '@/shared/ui/redesigned/Text';
import EyeIcon from '@/shared/assets/icons/eye.svg';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import {
  ArticleBlockType,
  ArticleView,
} from '../../../model/consts/articleConsts';
import { ArticleTextBlock } from '../../../model/types/article';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

export const ArticleListItemRedesigned = memo(
  (props: ArticleListItemProps) => {
    const { className, article, view, target } = props;
    const { t } = useTranslation();

    const types = (
      <Text text={article.type.join(', ')} className={cls.types} />
    );
    const views = (
      <HStack gap="8">
        <Icon Svg={EyeIcon} />
        <Text text={String(article.views)} className={cls.views} />
      </HStack>
    );

    if (view === ArticleView.BIG) {
      const textBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
      ) as ArticleTextBlock;

      return (
        <Card
          padding="24"
          max
          data-testid="ArticleListItem"
          className={classNames(cls.ArticleListItem, {}, [
            className,
            cls[view],
          ])}
        >
          <VStack max gap="16">
            <HStack gap="8" max>
              <Avatar size={32} src={article.user?.avatar} />
              <Text bold text={article.user?.username} />
              <Text text={article.createdAt} />
            </HStack>
            <Text text={article.title} bold />
            <Text text={article.subtitle} size="s" />
            <AppImage
              fallback={<Skeleton width="100%" height={250} />}
              src={article.img}
              alt={article.title}
              className={cls.img}
            />
            {textBlock?.paragraphs && (
              <Text 
              className={cls.textBlock}
              text={textBlock.paragraphs.slice(0, 2).join(' ')} />
            )}
            <HStack justify="between" max>
              <AppLink
                target={target}
                to={getRouteArticleDetails(article.id)}
              >
                <Button variant="outline">
                  {t('Читать далее...')}
                </Button>
              </AppLink>
              {views}
            </HStack>
          </VStack>
        </Card>
      );
    }

    return (
      <AppLink
        data-testid="ArticleListItem"
        target={target}
        to={getRouteArticleDetails(article.id)}
        className={classNames(cls.ArticleListItem, {}, [
          className,
          cls[view],
        ])}
      >
        <Card>
          <div className={cls.imageWrapper}>
            <AppImage
              fallback={<Skeleton width={200} height={200} />}
              alt={article.title}
              src={article.img}
              className={cls.img}
            />
            <Text text={article.createdAt} className={cls.date} />
          </div>
          <div className={cls.infoWrapper}>
            {types}
            {views}
          </div>
          <Text
            data-testid="SubtitleArticle"
            text={article.title}
            className={cls.title}
          />
        </Card>
      </AppLink>
    );
  },
);
