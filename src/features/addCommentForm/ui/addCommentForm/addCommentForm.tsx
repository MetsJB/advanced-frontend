import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './addCommentForm.module.scss';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import {
  getaddCommentFormError,
  getaddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slices/addCommentFormSlice';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card } from '@/shared/ui/redesigned/Card';

export interface addCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: addCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useSelector(getaddCommentFormText);
  const error = useSelector(getaddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [text, onSendComment, onCommentTextChange]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card padding="24" border="round" max>
            <HStack
              data-testid="AddCommentForm"
              justify="between"
              max
              gap="16"
              className={classNames(cls.addCommentFormRedesigned, {}, [
                className,
              ])}
            >
              <Input
                data-testid="AddCommentForm.Input"
                className={cls.input}
                onChange={onCommentTextChange}
                value={text}
                placeholder={t('Введите текст комментария')}
              />
              <Button
                onClick={onSendHandler}
                data-testid="AddCommentForm.Button"
                variant="outline"
              >
                {t('Оправить')}
              </Button>
            </HStack>
          </Card>
        }
        off={
          <HStack
            data-testid="AddCommentForm"
            justify="between"
            max
            className={classNames(cls.addCommentForm, {}, [
              className,
            ])}
          >
            <InputDeprecated
              data-testid="AddCommentForm.Input"
              className={cls.input}
              onChange={onCommentTextChange}
              value={text}
              placeholder={t('Введите текст комментария')}
            />
            <ButtonDeprecated
              onClick={onSendHandler}
              data-testid="AddCommentForm.Button"
              theme={ButtonTheme.OUTLINE}
            >
              {t('Оправить')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
});
export default AddCommentForm;
