import { useState } from "react";

export const useTextbox = (initialState: string = '') : [string, React.InputHTMLAttributes<HTMLInputElement>, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(initialState);

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return [
    value,
    {
      value,
      onChange
    },
    setValue
  ];
};

export const useCheckbox = (value: string, initialChecked: boolean = false) : [string, React.InputHTMLAttributes<HTMLInputElement>] => {
  const [checked, setChecked] = useState<boolean>(initialChecked);
  const [checkedValue, setCheckedValue] = useState<string>(initialChecked ? value : '');

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked);
    if (event.currentTarget.checked) {
      setCheckedValue(value);
    } else {
      setCheckedValue('');
    }
  };

  return [
    checkedValue,
    {
      value,
      checked,
      onChange
    }
  ];
};

export const useRadio = (choices: string[], initialChecked: string = '') : [string[], string, (value: string) => React.InputHTMLAttributes<HTMLInputElement> ] => {
  const [checkedValue, setCheckedValue] = useState<string>(choices.includes(initialChecked) ? initialChecked : '');

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCheckedValue(event.currentTarget.value);
  };
  // ランダムなname属性を生成する
  const [name] = useState(() => 'radio_' + new Date().getTime().toString(16) + Math.floor(10000 * Math.random()).toString(16));
  const attributes = (value: string) => {
    const checked = value === checkedValue;
    return {name, value, onChange, checked};
  };

  return [
    choices,
    checkedValue,
    attributes,
  ];
};