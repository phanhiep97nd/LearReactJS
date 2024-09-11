import React, { useState } from "react";

const PROD_TYPE = {
		FOOD: '1',
		DRINK: '2',
		OTHER: '3'
}
const initialType = [
		{ id: PROD_TYPE.FOOD, label: 'Food'},
		{ id: PROD_TYPE.DRINK, label: 'Drink'},
		{ id: PROD_TYPE.OTHER, label: 'Other product'},
]

const NewProduct = (props = {}) => {
		const [name, setName] = useState('');
		const [type, setType] = useState(initialType[0].id);

		const [radName] = useState(`radio_${new Date().getFullYear()}_${new Date().getMonth()}_${new Date().getDay()}_${Math.random()*100000}`);
		
		const getData = () => {
				const prodName = name;
				const prodType = type;
				//...Other logic
		}
		return (
				<>
						<input type="text" name="prodName" value={name} onChange={(e) => setName(e.currentTarget.value)}/>
						{
								initialType.map(item => {
										const id = `prodType_${item.id}`;
										return (
												<React.Fragment key={id}>
														<input id={id} type="radio" name={radName} onChange={(e) => setType(e.currentTarget.value)} value={item.id} checked={item.id==type}/>
														<label htmlFor={id}>{item.label}</label>
												</React.Fragment>
										)
								})
						}
						<button onClick={() => getData()}></button>
				</>
		)
}


export default NewProduct;