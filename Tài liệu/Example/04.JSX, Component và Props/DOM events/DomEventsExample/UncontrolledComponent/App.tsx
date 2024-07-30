import React, { useRef } from "react";

import "./App.css";
function App() {
	const inputRef = useRef<HTMLInputElement | null>(null);

	function handleSubmit() {
    if (inputRef.current)
		  alert(`Name: ${inputRef.current!.value}`);
	}

	return (
		<div className="App">
			<h3>Uncontrolled Component</h3>
			<form onSubmit={handleSubmit}>
				<label>Name :</label>
				<input
					type="text"
					name="name"
					ref={inputRef}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default App;