import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./LoginForm.module.scss";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { useDispatch, useSelector, useStore } from "react-redux";
import { memo, useCallback, useEffect } from "react";
import {
  loginActions,
  loginReducer,
} from "features/AuthByUsername/model/slice/loginSlice";
import { loginByUsername } from "features/AuthByUsername/model/services/loginByUsername";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { deflate } from "zlib";
import { ReduxStoreWithManager } from "app/providers/StoreProvider/config/stateSchema";
import { getLoginUsername } from "./../../model/selectors/getLoginUsername/getLoginUsername";
import { getLoginPassword } from "./../../model/selectors/getLoginPassword/getLoginPassword";
import { getLoginIsLoading } from "./../../model/selectors/getLoginIsLoading/getLoginIsLoading";
import { getLoginIsError } from "./../../model/selectors/getLoginIsError/getLoginIsError";
import { DynamicModuleLoader, ReducersList } from "shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";

export interface LoginFormProps {
  className?: string;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer
}

const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const isLoading = useSelector(getLoginIsLoading);
  const error = useSelector(getLoginIsError);

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUserName(value));
    },
    [dispatch]
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch]
  );

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ password, username }));
  }, [dispatch, username, password]);

  return (
    <DynamicModuleLoader removeAfterUnmount  reducers={initialReducers}>
      <div className={classNames(cls.LoginForm, {}, [className])}>
        <Text title={t("Форма авторизации")} />
        {error && (
          <Text
            text={t("Вы ввели неверный логин или пароль")}
            theme={TextTheme.ERROR}
          />
        )}
        <Input
          autofocus={true}
          type="text"
          className={cls.input}
          placeholder={t("Введите") + " username"}
          onChange={onChangeUsername}
          value={username}
        />
        <Input
          type="text"
          className={cls.input}
          placeholder={t("Введите") + " password"}
          onChange={onChangePassword}
          value={password}
        />
        <Button
          onClick={onLoginClick}
          theme={ButtonTheme.OUTLINE}
          className={cls.loginBtn}
          disabled={isLoading}
        >
          {t("Войти")}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
});

export default LoginForm;
