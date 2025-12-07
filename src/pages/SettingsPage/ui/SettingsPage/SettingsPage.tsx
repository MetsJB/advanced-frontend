import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from '@/shared/ui/redesigned/Text';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { UiDesignSwitcher } from '@/features/uiDesignSwitcher';
import { VStack } from '@/shared/ui/redesigned/Stack';

interface SettingsPagesProps {
  className?: string;
}

const SettingsPages = memo((props: SettingsPagesProps) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <Page className={classNames('', {}, [className])}>
      <VStack gap="16">
        <Text title={t('Настройки пользователя')} />
        <UiDesignSwitcher />
      </VStack>
    </Page>
  );
});

export default SettingsPages;
