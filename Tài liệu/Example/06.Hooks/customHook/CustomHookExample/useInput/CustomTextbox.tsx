import React from "react";

interface Props {
  className?: string;
  value: string;
  id: string;
  placeholder: string;
}

const CustomTextbox: React.FC<Props> = (props: Props) => {
  const defaultClassName = props.className ?? ".custom-input";

  return (
		<input type="text" {...props} className={defaultClassName} />
  )
}

export default CustomTextbox;