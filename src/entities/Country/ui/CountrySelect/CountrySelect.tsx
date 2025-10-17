import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Country } from '../../model/types/country';
import { ListBox } from '@/shared/ui/Popups';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
    { value: Country.Russia, content: Country.Russia },
    { value: Country.Belarus, content: Country.Belarus },
    { value: Country.Armenia, content: Country.Armenia },
    { value: Country.Kazakhstan, content: Country.Kazakhstan },
];

export const CountrySelect = memo(
    ({
        className, onChange, value, readonly,
    }: CountrySelectProps) => {
        const { t } = useTranslation();

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as Country);
            },
            [onChange],
        );

        return (
            <ListBox
                onChange={onChangeHandler}
                className={className}
                defaultValue={t('Укажите страну')}
                items={options}
                readonly={readonly}
                value={value}
                direction="top right"
                label={t('Укажите страну')}
            />
        );

    // return (
    //   <Select
    //     className={classNames("", {}, [className])}
    //     label={t("Укажите страну")}
    //     options={options}
    //     value={value}
    //     onChange={onChangeHandler}
    //     readonly={readonly}
    //   />
    // );
    },
);
