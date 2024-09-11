import React, { useEffect, useState } from 'react';
import { BUTTON_TYPE } from '../constance';

interface Props {
		style: React.CSSProperties | undefined,
		buttonType?: number,
		label: string,
		handlerClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const createStyle = (style: React.CSSProperties | undefined, buttonType?: number) => {
		let localStyle = (style)? (style) : {
				fontFamily: "Arial",						
				borderRadius: "15",						
				color: "black"						
		}
		if (buttonType) {								
				var backgroundColorSet  = { backgroundColor: "grey" };						
				switch (buttonType) {						
						case BUTTON_TYPE.INFO_BUTTON:				
								backgroundColorSet = { backgroundColor: "white" }		
								break;		
						case BUTTON_TYPE.ALERT_BUTTON:				
								backgroundColorSet = { backgroundColor: "red" }		
								break;		
						case BUTTON_TYPE.SUCCESS_BUTTON:				
								backgroundColorSet = { backgroundColor: "blue" }		
								break;		
				}						
				localStyle = {...localStyle, ...backgroundColorSet};
		}
		return localStyle;
}

const CoreButton: React.FC<Props> = ({ style, buttonType, label, handlerClick }) => {
		const [localStyle, ] = useState<React.CSSProperties | undefined>(createStyle(style, buttonType));

		const localHandleClick: React.MouseEventHandler<HTMLButtonElement> | undefined = handlerClick ?? ((e) => console.log('Click!'))
						
		return (								
				<button style={localStyle} onClick={localHandleClick}>{label ?? ""}</button>						
		)								
}

export default CoreButton;