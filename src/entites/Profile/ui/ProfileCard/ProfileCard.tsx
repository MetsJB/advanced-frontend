import { classNames, Mods } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ProfileCard.module.scss";
import { useSelector } from "react-redux";
import { getProfileData } from "entites/Profile/model/selectors/getProfileData/getProfileData";
import { getProfileIsLoading } from "entites/Profile/model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileError } from "entites/Profile/model/selectors/getProfileError/getProfileError";
import { Text, TextAlign, TextTheme } from "shared/ui/Text/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { Profile } from "../../model/types/profile";
import { Loader } from "shared/ui/Loader/Loader";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Select } from "shared/ui/Select/Select";
import { Currency, CurrencySelect } from "entites/Currency";
import { Country } from "shared/const/Country";
import { CountrySelect } from "entites/Country";

interface ProfileCardProps {
  className?: string;
  data?: Profile;
  error?: string;
  isLoading?: boolean;
  readonly?: boolean;
  onChangeLastname?: (value: string) => void;
  onChangeFirstname?: (value: string) => void;
  onChangeCity?: (value: string) => void;
  onChangeAge?: (value: string) => void;
  onChangeUsername?: (value: string) => void;
  onChangeAvatar?: (value: string) => void;
  onChangeCurrency?: (value: Currency) => void;
  onChangeContry?: (value: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
    onChangeLastname,
    onChangeFirstname,
    onChangeAge,
    onChangeCity,
    onChangeUsername,
    onChangeAvatar,
    onChangeContry,
    onChangeCurrency,
    readonly,
  } = props;
  const { t } = useTranslation("profile");

  if (isLoading) {
    return (
      <div
        className={classNames(cls.ProfileCard, { [cls.loading]: true }, [
          className,
        ])}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classNames(cls.ProfileCard, {}, [className, cls.error])}>
        <Text
          theme={TextTheme.ERROR}
          title={t("Произошла ошибка при загрузке профиля")}
          text={t("Попробуйте обновить страницу")}
          align={TextAlign.CENTER}
        />
      </div>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <div className={classNames(cls.ProfileCard, mods, [className])}>
      <div className={cls.data}>
        {data?.avatar && (
          <div className={cls.avatarWrapper}>
            <Avatar src={data?.avatar} />
          </div>
        )}
        <Input
          value={data?.first}
          placeholder={t("Ваше имя")}
          className={cls.input}
          onChange={onChangeFirstname}
          readonly={readonly}
        />
        <Input
          value={data?.lastname}
          placeholder={t("Ваша фамилия")}
          className={cls.input}
          onChange={onChangeLastname}
          readonly={readonly}
        />
        <Input
          value={data?.age}
          placeholder={t("Ваш возраст")}
          className={cls.input}
          onChange={onChangeAge}
          readonly={readonly}
        />
        <Input
          value={data?.city}
          placeholder={t("Город")}
          className={cls.input}
          onChange={onChangeCity}
          readonly={readonly}
        />
        <Input
          value={data?.username}
          placeholder={t("Введите имя пользователя")}
          className={cls.input}
          onChange={onChangeUsername}
          readonly={readonly}
        />
        <Input
          value={data?.avatar}
          placeholder={t("введите ссылку на аватар")}
          className={cls.input}
          onChange={onChangeAvatar}
          readonly={readonly}
        />
        <CurrencySelect
          readonly={readonly}
          value={data?.currency}
          onChange={onChangeCurrency}
          className={cls.input}
        />
        <CountrySelect
          readonly={readonly}
          value={data?.country}
          onChange={onChangeContry}
          className={cls.input}
        />
        
      </div>
    </div>
  );
};
