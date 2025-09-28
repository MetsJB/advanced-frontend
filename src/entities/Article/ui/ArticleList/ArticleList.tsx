import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { HTMLAttributeAnchorTarget, memo } from "react";
import cls from "./ArticleList.module.scss";
import { Article } from "../../model/types/article";
import { ArticleView } from "../../model/consts/articleConsts";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "shared/ui/Text/Text";
import {
  AutoSizer,
  List,
  ListRowProps,
  WindowScroller,
} from "react-virtualized";
import { PAGE_ID } from "widgets/Page/Page";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view == ArticleView.SMALL ? 9 : 3)
    .fill(0)
    .map((item, index) => (
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    ));

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    target,
    virtualized = true,
    view = ArticleView.SMALL,
  } = props;
  const { t } = useTranslation();

  const isBig = view === ArticleView.BIG;
  const itemsPerRow = isBig ? 1 : 3;

  const rowCount = isBig
    ? articles.length
    : Math.ceil(articles.length / itemsPerRow);

  const rowRender = (props: ListRowProps) => {
    const { index, isScrolling, key, style } = props;

    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for (let i = fromIndex; i < toIndex; i++) {
      items.push(
        <ArticleListItem
          target={target}
          className={cls.card}
          view={view}
          article={articles[i]}
          key={"str" + i}
        />
      );
    }

    return (
      <div key={key} style={style} className={cls.row}>
        {items}
      </div>
    );
  };

  // const renderArticle = (article: Article) => {
  //   return (
  //     <ArticleListItem
  //       target={target}
  //       key={article.id}
  //       className={cls.card}
  //       view={view}
  //       article={article}
  //     />
  //   );
  // };

  if (!isLoading && !articles.length) {
    return (
      <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
        <Text size={TextSize.L} title={t("Статьи не найдены")} />
      </div>
    );
  }

  return (
    //@ts-ignore
    <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}>
      {({
        height,
        width,
        registerChild,
        onChildScroll,
        scrollTop,
        isScrolling,
      }) => (
        <div
          //@ts-ignore
          ref={registerChild}
          className={classNames(cls.ArticleList, {}, [className, cls[view]])}
        >
          {virtualized ? (
            //@ts-ignore
            <List
              height={height ?? 700}
              rowCount={rowCount}
              rowHeight={isBig ? 700 : 330}
              rowRenderer={rowRender}
              width={width ? width - 80 : 700}
              autoHeight
              onScroll={onChildScroll}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
            />
          ) : (
            articles.map((article) => (
              <ArticleListItem
                article={article}
                view={view}
                target={target}
                key={article.id}
                className={cls.card}
              />
            ))
          )}

          {isLoading && getSkeletons(view)}
        </div>
      )}
    </WindowScroller>
  );
});
