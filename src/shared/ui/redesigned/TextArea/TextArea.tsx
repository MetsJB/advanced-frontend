import React, {
  memo,
  TextareaHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from 'react';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import cls from './TextArea.module.scss';
import { HStack } from '../Stack';
import { Text } from '../Text/Text';

type HTMLTextAreaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'readOnly' | 'size'
>;


interface TextAreaProps extends HTMLTextAreaProps {
  className?: string;
  value?: string | number;
  label?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean;
  readonly?: boolean;
  notResize?: boolean
}

export const TextArea = memo((props: TextAreaProps) => {
  const {
    placeholder,
    className,
    value,
    onChange,
    autofocus,
    readonly,
    label,
    notResize,
    ...otherProps
  } = props;

  const ref = useRef<HTMLTextAreaElement>(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (autofocus) {
      setIsFocused(true);
      ref.current?.focus();
    }
  }, [autofocus]);

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    onChange?.(e.target.value);
  };

  const mods: Mods = {
    [cls.readonly]: readonly,
    [cls.focused]: isFocused,
    [cls.notResize]: notResize,
  };

  const textArea = (
    <textarea
      ref={ref}
      onFocus={onFocus}
      onBlur={onBlur}
      className={classNames(cls.textArea, mods, [])}
      value={value}
      onChange={onChangeHandler}
      readOnly={readonly}
      placeholder={placeholder}
      {...otherProps}
    />
  );

  if (label) {
    return (
      <HStack className={className} max gap="8">
        <Text text={label} />
        {textArea}
      </HStack>
    );
  }

  return textArea;
});
