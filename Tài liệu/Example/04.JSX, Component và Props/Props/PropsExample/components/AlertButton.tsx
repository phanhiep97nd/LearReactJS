import React from 'react'						
import CoreButton from './CoreButton'		
import { BUTTON_TYPE } from '../constance'		

interface Props {
  style: React.CSSProperties | undefined,
		label: string,
		handlerClick: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const AlertButton: React.FC<Props> = ({style, label, handlerClick}) => {						
		return (				
				<CoreButton style={style} label={label} buttonType={BUTTON_TYPE.ALERT_BUTTON} handlerClick={handlerClick}></CoreButton>		
		)				
}						
						
export default AlertButton						
