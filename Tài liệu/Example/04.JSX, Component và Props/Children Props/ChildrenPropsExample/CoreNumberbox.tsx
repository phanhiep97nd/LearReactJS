import React from "react";

interface Props {
  label: string;
  val: number;
}

const CoreNumberbox: React.FC<Props> = ({label, val}) => {
		return (
		/** Input là expression */
				<>
						<label htmlFor="ageBox">{label}</label>
						<input type="number" name="ageBox" value={val} />
				</>
		)
}

export default CoreNumberbox;