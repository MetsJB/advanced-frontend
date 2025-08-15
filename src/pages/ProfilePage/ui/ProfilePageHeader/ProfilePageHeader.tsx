import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import cls from "./ProfilePageHeader.module.scss";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text } from "shared/ui/Text/Text";
import { useDispatch, useSelector } from "react-redux";
import { getProfileReadonly, profileActions, updateProfileData } from "entites/Profile";
import { useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
  const { t } = useTranslation("profile");

  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();
  
  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);
  
  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);
  
  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(cls.ProfilePageHeader, {}, [className])}>
      <Text title={t("Профиль")} />
      {readonly ? (
        <Button onClick={onEdit} className={cls.editBtn} theme={ButtonTheme.OUTLINE}>
          {t("Редактировать")}
        </Button>
      ) : (
        <>
        <Button onClick={onCancelEdit} className={cls.editBtn} theme={ButtonTheme.OUTLINE_RED}>
          {t("Отменить")}
        </Button>
        <Button onClick={onSave} className={cls.saveBtn} theme={ButtonTheme.OUTLINE}>
          {t("Сохранить")}
        </Button>
        </>
      )}
    </div>
  );
};
