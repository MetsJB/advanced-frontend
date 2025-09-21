import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleDetails.module.scss";
import {
  DynamicModuleLoader,
  ReducersList,
} from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import EyeIcon from "shared/assets/icons/eye-20-20.svg";
import CalendarIcon from "shared/assets/icons/calendar-20-20.svg";
import { ArticleDetailsReducer } from "../../model/slice/articleDetailsSlice";
import { useDispatch, useSelector } from "react-redux";
import { memo, useCallback, useEffect } from "react";
import { fetchArticleByID } from "../../model/services/fetchArticleByID";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from "../../model/selectors/articleDetails";
import { Text, TextAlign, TextSize } from "shared/ui/Text/Text";
import { Skeleton } from "shared/ui/Skeleton/Skeleton";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Icon } from "shared/ui/Icon/Icon";
import {
  ArticleBlock,
  ArticleBlockType,
} from "entities/Article/model/types/article";
import { ArticleCodeBlockComponent } from "../ArticleCodeBlockComponent/ArticleCodeBlockComponent";
import { ArticleImageBlockComponent } from "../ArticleImageBlockComponent/ArticleImageBlockComponent";
import { ArticleTextBlockComponent } from "../ArticleTextBlockComponent/ArticleTextBlockComponent";
import { HStack, VStack } from "shared/ui/Stack";

interface ArticleDetailsProps {
  className?: string;
  id: string;
}

const reducers: ReducersList = {
  articleDetails: ArticleDetailsReducer,
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const { t } = useTranslation();
  const { className, id } = props;
  const dispatch = useAppDispatch();
  const isLodaing = useSelector(getArticleDetailsIsLoading);
  const article = useSelector(getArticleDetailsData);
  const error = useSelector(getArticleDetailsError);

  const renderBlock = useCallback((block: ArticleBlock) => {
    switch (block.type) {
      case ArticleBlockType.CODE:
        return (
          <ArticleCodeBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      case ArticleBlockType.IMAGE:
        return (
          <ArticleImageBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );
      case ArticleBlockType.TEXT:
        return (
          <ArticleTextBlockComponent
            key={block.id}
            className={cls.block}
            block={block}
          />
        );

      default:
        return null;
    }
  }, []);

  useEffect(() => {
    if (__PROJECT__ !== "storybook") {
      dispatch(fetchArticleByID(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLodaing) {
    content = (
      <>
        <Skeleton
          className={cls.avatar}
          width={200}
          height={200}
          border="50%"
        />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width={"100%"} height={200} />
        <Skeleton className={cls.skeleton} width={"100%"} height={200} />
      </>
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title="Произошла ошибка при загрузке статьи"
      />
    );
  } else {
    content = (
      <>
        <HStack justify="center" max className={cls.avatartWrappper}>
          <Avatar size={200} src={article?.img} className={cls.avatar} />
        </HStack>
        <VStack gap="4">
          <Text
            className={cls.title}
            title={article?.title}
            text={article?.subtitle}
            size={TextSize.L}
          />
          <HStack gap="8" className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={EyeIcon} />
            <Text text={String(article?.views)} />
          </HStack>
          <HStack gap="8" className={cls.articleInfo}>
            <Icon className={cls.icon} Svg={CalendarIcon} />
            <Text text={article?.createdAt} />
          </HStack>
        </VStack>
        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <VStack
      max
        gap="16"
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </VStack>
    </DynamicModuleLoader>
  );
});
