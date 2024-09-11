function UserProfile({ name, age, ...otherProps }) {		
  return (		
		<div>		
		  <h1>User Profile</h1>		
		  <p>Name: {name}</p>		
		  <p>Age: {age}</p>		
				  
		  <h2>Other Information</h2>		
		  <ul>		
				{Object.entries(otherProps).map(([key, value]) => (		
				  <li key={key}>{key}: {value}</li>		
				))}		
		  </ul>		
		</div>		
  );		
}		

// Sử dụng component
<UserProfile 
  name="Nguyen Van A" 
  age={30} 
  location="Hanoi" 
  hobby="Reading" 
/>