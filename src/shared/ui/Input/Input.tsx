import { classNames } from "shared/lib/classNames/classNames";
import cls from "./Input.module.scss";
import React, { InputHTMLAttributes, memo, useEffect, useRef, useState } from "react";

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "value" | "onChange"
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  autofocus?: boolean
}

export const Input = memo((props: InputProps) => {
  const {
    placeholder,
    className,
    type = "text",
    value,
    onChange,
    autofocus,
    ...otherProps
  } = props;

  const ref = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false);
  const [caretPosition, setCaretPosition] = useState(0);

 useEffect(()=> {
  if (autofocus) {
    setIsFocused(true)
    ref.current?.focus() 
  }
}, [autofocus])

  const onBlur = () => {
    setIsFocused(false);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onSelect = (e: any) => {
      setCaretPosition(e?.target?.selectionStart)
  }

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
    setCaretPosition(e.target.value.length)
  };

  return (
    <div className={classNames(cls.InputWrapper, {}, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>{`${placeholder}>`}</div>
      )}
      <div className={cls.caretWrapper}>
        <input
        ref={ref}
          onFocus={onFocus}
          onBlur={onBlur}
          className={cls.input}
          type={type}
          value={value}
          onSelect={onSelect}
          onChange={onChangeHandler}
          {...otherProps}
        />
        {isFocused && <span 
        className={cls.caret}
        style={{left: `${caretPosition * 9}px`}}
        />}
      </div>
    </div>
  );
});
