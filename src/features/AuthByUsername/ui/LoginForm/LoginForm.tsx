import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./LoginForm.module.scss";
import { Button } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(cls.LoginForm, {}, [className])}>
      <Input 
      autofocus={true}
      type="text" 
      className={cls.input}
      placeholder={t('Введите username')}
      />
      <Input 
      type="text" 
      className={cls.input}
      placeholder={t('Введите password')}
      />
      <Button className={cls.loginBtn}>{t("Войти")}</Button>
    </div>
  );
};
 
