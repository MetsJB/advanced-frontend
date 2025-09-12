import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./CurrencySelect.module.scss";
import { Select } from "shared/ui/Select/Select";
import { Currency } from "../../model/type/currency";
import { memo, useCallback } from "react";
import { ListBox } from "shared/ui/ListBox/ListBox";

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = [
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(
  ({ className, onChange, value, readonly }: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback(
      (value: string) => {
        onChange?.(value as Currency);
      },
      [onChange]
    );

    return (
      <ListBox
        className={className}
        value={value}
        defaultValue={t("Укажите валюту")}
        items={options}
        onChange={onChangeHandler}
        readonly={readonly}
        direction="top"
        label={t("Укажите валюту")}
      />
    );
  }
);
