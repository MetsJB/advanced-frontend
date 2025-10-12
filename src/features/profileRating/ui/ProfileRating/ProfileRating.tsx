import { RatingCard } from "@/entities/Rating";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getUserAuthData } from "@/entities/User";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";
import {
  useGetProfileRating,
  useRateProfile,
} from "../../api/profileRatingApi";

export interface ProfileRatingProps {
  className?: string;
  profileId: string;
}

const ProfileRating = memo((props: ProfileRatingProps) => {
  const { className, profileId } = props;
  const { t } = useTranslation();
  const userData = useSelector(getUserAuthData);
  const isMyProfile = profileId === userData?.id;

  const { data, isLoading } = useGetProfileRating({
    profileId,
    userId: userData?.id ?? "",
  });
  const [rateProfileMutation] = useRateProfile();

  const rating = data?.[0];

  const handleRateProfile = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateProfileMutation({
          userId: userData?.id ?? "",
          profileId: profileId,
          rate: starsCount,
          feedback,
        });
      } catch (error) {
        console.log(error);
      }
    },
    [profileId, rateProfileMutation, userData?.id]
  );
  const onCancel = useCallback(
    (starsCount: number) => {
      handleRateProfile(starsCount);
    },
    [handleRateProfile]
  );
  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleRateProfile(starsCount, feedback);
    },
    [handleRateProfile]
  );

  if (isMyProfile) {
    return null;
  }

  if (isLoading) {
    return <Skeleton width={"100%"} height={120} />;
  }

  return (
    <RatingCard
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      title={t("Оцените профиль")}
      feedbackTitle={t(
        "Оставьте свой отзыв о профиле, это поможет улучшить качество"
      )}
      hasFeedback
      className={className}
    />
  );
});

export default ProfileRating;
