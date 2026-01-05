import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  ArticleBlock,
  ArticlePanelBlocks,
  ArticleType,
  ArticleTypeSelect
} from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { changeFieldBlock } from '../../lib/changeFieldBlock';
import {
  getArticleContorlPanelForm,
  getArticleContorlPanelIsLoading,
  getArticleContorlPanelReadonly,
} from '../../model/selectors/articleContorlPaneSelectors';
import { fetchArticleByIDControlPanel } from '../../model/services/fetchArticleByIDControlPanel';
import { updateArticleControlPanelData } from '../../model/services/updateArticleControlPanelData';
import {
  articleContorlPanelActions,
  articleContorlPanelReducer,
} from '../../model/slice/ArticleContorlPanelSlice';
import { ArticleContorlPanelHeader } from '../ArticleContorlPanelHeader/ArticleContorlPanelHeader';
import cls from './ArticleContorlPanel.module.scss';

interface ArticleContorlPanelProps {
  className?: string;
  isEdit?: boolean;
}

const reducers: ReducersList = {
  articleContorlPanel: articleContorlPanelReducer,
};

export const ArticleContorlPanel = memo(
  (props: ArticleContorlPanelProps) => {
    let content;
    const { className, isEdit } = props;
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();
    const readonly = useSelector(getArticleContorlPanelReadonly);
    const article = useSelector(getArticleContorlPanelForm);
    const isLodaing = useSelector(getArticleContorlPanelIsLoading);
    const dispatch = useAppDispatch();
    const currBlocks = article?.blocks;

    useInitialEffect(() =>
      dispatch(fetchArticleByIDControlPanel(id)),
    );

    const onEdit = useCallback(() => {
      dispatch(articleContorlPanelActions.setReadonly(false));
    }, [dispatch]);

    const onSave = useCallback(() => {
      dispatch(updateArticleControlPanelData());
    }, [dispatch]);

    const onCancel = useCallback(() => {
      dispatch(articleContorlPanelActions.cancelEdit());
    }, [dispatch]);

    const onChangeTitle = useCallback(
      (title: string) => {
        dispatch(
          articleContorlPanelActions.updateArticle({
            title,
          }),
        );
      },
      [dispatch],
    );

    const onChangeSubTitle = useCallback(
      (subtitle: string) => {
        dispatch(
          articleContorlPanelActions.updateArticle({ subtitle }),
        );
      },
      [dispatch],
    );

   

    const onChangeCode = useCallback(
      (code: string, block: ArticleBlock) => {
        if (article?.blocks && currBlocks) {
          dispatch(
            articleContorlPanelActions.updateArticle({
              blocks: currBlocks.map((currentBlock) =>
                changeFieldBlock(code, block, currentBlock),
              ),
            }),
          );
        }
      },
      [article?.blocks, currBlocks, dispatch],
    );

    const onChangeInput = useCallback(
      (text: string, block: ArticleBlock) => {
        if (article?.blocks && currBlocks) {
          dispatch(
            articleContorlPanelActions.updateArticle({
              blocks: currBlocks.map((currentBlock) =>
                changeFieldBlock(text, block, currentBlock, 'title'),
              ),
            }),
          );
        }
      },
      [article?.blocks, currBlocks, dispatch],
    );

    const onChangeParagraphs = useCallback(
      (text: string, block: ArticleBlock) => {
        if (article?.blocks && currBlocks) {
          dispatch(
            articleContorlPanelActions.updateArticle({
              blocks: currBlocks.map((currentBlock) =>
                changeFieldBlock(
                  text,
                  block,
                  currentBlock,
                  'paragraphs',
                ),
              ),
            }),
          );
        }
      },
      [article?.blocks, currBlocks, dispatch],
    );

    const onChangeURL = useCallback(
      (text: string, block: ArticleBlock) => {
        if (article?.blocks && currBlocks) {
          dispatch(
            articleContorlPanelActions.updateArticle({
              blocks: currBlocks.map((currentBlock) =>
                changeFieldBlock(text, block, currentBlock, 'src'),
              ),
            }),
          );
        }
      },
      [article?.blocks, currBlocks, dispatch],
    );

    const onChangeImg = useCallback(
      (img: string) => {
        dispatch(articleContorlPanelActions.updateArticle({ img }));
      },
      [dispatch],
    );

    const onChangeArticleType = useCallback(
      (type: ArticleType) => {
        dispatch(
          articleContorlPanelActions.updateArticle({
            type: [type],
          }),
        );
      },
      [dispatch],
    );

    if (isLodaing) {
      content = (
        <VStack gap="16">
          <HStack justify="between" max>
            <Skeleton width={180} height={30} />
            <Skeleton width={250} height={30} />
          </HStack>
          <Skeleton width="100%" height={300} />
        </VStack>
      );
    } else {
      content = (
        <>
          <VStack align="center" gap="24">
            <ArticleContorlPanelHeader
              id={id}
              onCancel={onCancel}
              onEdit={onEdit}
              onSave={onSave}
              readonly={readonly}
              className={cls.header}
            />
            <VStack className={cls.content} max gap="8">
              <Input
                onChange={onChangeTitle}
                readonly={readonly}
                value={article?.title}
                label={t('Заголовок')}
              />
              <Input
                onChange={onChangeImg}
                readonly={readonly}
                value={article?.img}
                label={t('URL картинки')}
              />
              <ArticleTypeSelect
                readonly={readonly}
                onChange={onChangeArticleType}
                value={article?.type?.[0]}
              />
              <Input
                onChange={onChangeSubTitle}
                readonly={readonly}
                value={article?.subtitle}
                label={t('Подзаголовок')}
              />
            </VStack>
          </VStack>
          <ArticlePanelBlocks
            readonly={readonly}
            className={cls.block}
            blocks={article?.blocks ?? []}
            onChangeURL={onChangeURL}
            onChangeCode={onChangeCode}
            onChangeInput={onChangeInput}
            onChangeParagraphs={onChangeParagraphs}
          />
        </>
      );
    }

    return (
      <DynamicModuleLoader reducers={reducers}>
        <Card
          padding="24"
          className={classNames(cls.ArticleContorlPanel, {}, [
            className,
          ])}
        >
          {content}
        </Card>
      </DynamicModuleLoader>
    );
  },
);
