import { classNames } from "@/shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ArticleDeTailsPage.module.scss";
import { memo } from "react";
import { useParams } from "react-router-dom";
import { ArticleDetails } from "@/entities/Article";
import {
  DynamicModuleLoader,
  ReducersList,
} from "@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { Page } from "@/widgets/Page/Page";
import { articleDetailsPageReducer } from "../../model/slices";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { VStack } from "@/shared/ui/Stack";
import { ArticleRecommendationsList } from "@/features/articleRecommendationsList";
import { ArticleDeTailsComments } from "../ArticleDeTailsComments/ArticleDeTailsComments";

interface ArticleDeTailsPageProps {
  className?: string;
}

const ArticleDeTailsPage = ({ className }: ArticleDeTailsPageProps) => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();


  const reducers: ReducersList = {
    articleDetailsPage: articleDetailsPageReducer,
  };

  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <Page className={classNames(cls.ArticleDeTailsPage, {}, [className])}>
        <VStack gap="16" max>
          <ArticleDetailsPageHeader />
          <ArticleDetails id={id} />
          <ArticleRecommendationsList />
          <ArticleDeTailsComments id={id} />
        </VStack>
      </Page>
    </DynamicModuleLoader>
  );
};

export default memo(ArticleDeTailsPage);
