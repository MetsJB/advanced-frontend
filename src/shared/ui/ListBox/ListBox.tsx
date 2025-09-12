import { Fragment, ReactNode, useState } from "react";
import { Listbox as HListbox } from "@headlessui/react";
import cls from "./ListBox.module.scss";
import { classNames, Mods } from "shared/lib/classNames/classNames";
import { Button } from "../Button/Button";
import { HStack } from "./../Stack/HStack/HStack";

export interface ListBoxItem {
  value: string;
  content: ReactNode;
  disabled?: boolean;
}

type DropDownDirection = "top" | "bottom";

interface ListBoxProps {
  items?: ListBoxItem[];
  className?: string;
  value?: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  direction?: DropDownDirection;
  label?: string;
}

const mapDirectionClass: Record<DropDownDirection, string> = {
  bottom: cls.optionsBottom,
  top: cls.optionsTop,
};

export function ListBox(props: ListBoxProps) {
  const {
    readonly,
    className,
    direction = "bottom",
    items,
    defaultValue,
    onChange,
    value,
    label,
  } = props;

  const optionsClasses = [mapDirectionClass[direction]];

  return (
    <HStack gap="4"  >
      {label && <span >{label + ">"}</span>}
      <HListbox
        disabled={readonly}
        as={"div"}
        className={classNames(cls.ListBox, {}, [className])}
        value={value}
        onChange={onChange}
      >
        <HListbox.Button disabled={readonly} className={cls.trigger}>
          <Button disabled={readonly}>{value ?? defaultValue}</Button>
        </HListbox.Button>
        <HListbox.Options
          className={classNames(cls.options, {}, optionsClasses)}
        >
          {items?.map((item) => (
            <HListbox.Option
              key={item.value}
              value={item.value}
              as={Fragment}
              disabled={item.disabled}
            >
              {({ active }) => (
                <li
                  className={classNames(cls.item, {
                    [cls.disabled]: item.disabled,
                    [cls.active]: active,
                  })}
                >
                  {item.content}
                </li>
              )}
            </HListbox.Option>
          ))}
        </HListbox.Options>
      </HListbox>
    </HStack>
  );
}
