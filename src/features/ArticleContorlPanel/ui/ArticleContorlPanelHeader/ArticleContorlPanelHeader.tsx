import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/shared/ui/redesigned/Button';
import { Text } from '@/shared/ui/redesigned/Text';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleContorlPanelHeaderProps {
  className?: string;
  id?: string;
  readonly?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export const ArticleContorlPanelHeader = memo(
  (props: ArticleContorlPanelHeaderProps) => {
    const { className, id, onCancel, onEdit, onSave, readonly } =
      props;
    const { t } = useTranslation();

    return (
      <HStack className={className} max justify="between">
        <Text
          title={
            id
              ? `Статья с ID = ${id}`
              : 'Создание новой статьи'
          }
        />
        {readonly ? (
          <Button onClick={onEdit}>
            {t('Редактировать')}
          </Button>
        ) : (
          <HStack gap="16">
            <Button color="success" onClick={onSave}>
              {t('Сохранить')}
            </Button>
            <Button color="error" onClick={onCancel}>
              {t('Отменить')}
            </Button>
          </HStack>
        )}
      </HStack>
    );
  },
);
