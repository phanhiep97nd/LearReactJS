import React from "react";

interface Props {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: React.FC<Props> = (props) => {
  const defaultOnClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		if (props.onClick)
		  props.onClick(event);
		event.preventDefault();
  }

		return <button onClick={defaultOnClick}>Click me</button>;
};
