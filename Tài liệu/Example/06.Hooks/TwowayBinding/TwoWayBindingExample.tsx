import React, { ChangeEvent, useState } from 'react';

/**
 * Component này gồm: Một textbox có thể nhập giá trị và một label biểu thị giá trị sau khi nhập tại textbox
 * Mỗi khi nhập giá trị trong textbox, giá trị được phản ánh ngay lập tức lên label
 */
const ShowInputComponent = () => {
  const [text, setText] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <div>
      <input type="text" value={text} onChange={handleChange} />
      <p>Text: {text}</p>
    </div>
  );
}

export default ShowInputComponent;
