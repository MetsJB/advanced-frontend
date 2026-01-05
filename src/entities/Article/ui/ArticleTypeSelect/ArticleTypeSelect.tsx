import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticleType } from '../../model/consts/articleConsts';
import { ListBox } from '@/shared/ui/redesigned/Popups';

interface ArticleTypeSelectProps {
  className?: string;
  value?: ArticleType;
  onChange?: (value: ArticleType) => void;
  readonly?: boolean;
}

export const ArticleTypeSelect = memo(
  (props: ArticleTypeSelectProps) => {
    const { className, onChange, readonly, value } = props;
    const { t } = useTranslation();

    const options = [
      {
        value: ArticleType.ECONOMICS,
        content: ArticleType.ECONOMICS,
      },
      { value: ArticleType.IT, content: ArticleType.IT },
      { value: ArticleType.SCIENCE, content: ArticleType.SCIENCE },
    ];

    const onChangeHandler = useCallback(
      (value: ArticleType) => {
        onChange?.(value);
      },
      [onChange],
    );

    

    return (
      <ListBox
        onChange={onChangeHandler}
        value={value}
        label={t('Укажите тип статьи')}
        defaultValue={t('Укажите тип статьи')}
        direction="top right"
        items={options}
        readonly={readonly}
      />
    );
  },
);
