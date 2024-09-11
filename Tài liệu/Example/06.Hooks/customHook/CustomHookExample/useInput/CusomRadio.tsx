import React from "react";

interface RadioProps {
	className?: string;
	value: string;
	checked: boolean;
	name: string;
}

interface LabelProps {
	className?: string;
	label?: string;
}

interface Props {
	radioProps: RadioProps;
	labelProps: LabelProps;
}

const CustomRadio: React.FC<Props> = (props: Props) => {
	const defaultClassName = props.radioProps.className ?? ".custom-radio";
	const currentDate = new Date();
	const id=`radio_${currentDate.getFullYear()}_${currentDate.getMonth()}_${currentDate.getDay()}_${currentDate.getHours()}_${currentDate.getMinutes()}_${currentDate.getSeconds()}_${currentDate.getMilliseconds()}`;

	return (
	<React.Fragment key={id}>
		<input type="radio" id={id} {...props.radioProps} className={defaultClassName} />
		<label htmlFor={id} {...props.labelProps}>{props.labelProps.label}</label>
	</React.Fragment>
	)
}

export default CustomRadio;