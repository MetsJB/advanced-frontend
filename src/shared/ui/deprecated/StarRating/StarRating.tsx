import { memo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import StarIcon from '@/shared/assets/icons/star.svg';
import cls from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
  const {
    className,
    onSelect,
    selectedStars = 0,
    size = 30,
  } = props;
  const [currentStarsCount, setCurrentStarsCount] =
    useState(selectedStars);
  const [isSelected, setIsSelected] = useState(
    Boolean(selectedStars),
  );

  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  const onClick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  return (
    <div
      className={classNames(cls.StarRating, {}, [
        className,
      ])}
    >
      {stars.map((starNumber) => (
        <Icon
          Svg={StarIcon}
          className={classNames(
            cls.starIcon,
            {
              [cls.isSelected]: isSelected,
            },
            [
              currentStarsCount >= starNumber
                ? cls.hovered
                : cls.normal,
            ],
          )}
          key={starNumber}
          width={size}
          height={size}
          onMouseLeave={onLeave}
          onMouseEnter={onHover(starNumber)}
          onClick={onClick(starNumber)}
          data-testid={`StarRating.${starNumber}`}
          data-selected={currentStarsCount >= starNumber}
        />
      ))}
    </div>
  );
});
