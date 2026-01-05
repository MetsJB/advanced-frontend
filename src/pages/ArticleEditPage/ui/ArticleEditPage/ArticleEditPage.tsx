import { useParams } from 'react-router-dom';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleContorlPanel } from '@/features/ArticleContorlPanel';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  return (
    <Page
      className={classNames(cls.ArticleEditPage, {}, [className])}
    >
      <ArticleContorlPanel isEdit={isEdit} />
    </Page>
  );
});

export default ArticleEditPage;
