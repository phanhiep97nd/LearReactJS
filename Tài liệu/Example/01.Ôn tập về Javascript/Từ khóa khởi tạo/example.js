// example 1
function example() {
	var test_var = 'Hi';
	// code
	for (var i = 0; i < 10; i ++)
	{			
		var test_var = 'Hello';
		// code
	}
	// code
	console.log(test_var);			// phải debug thì mới biết giá trị test_var đã được cập nhật ở đâu
}

// example 2
const mess_obj = {
	id: 'A01',
	value: 'Hello'
}
mess_obj.value = 'Hi'
console.log(mess_obj.value);