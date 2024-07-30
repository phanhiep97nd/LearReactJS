import { useTextbox, useRadio } from "./useInput";
import CustomTextbox from "./CustomTextbox";
import CustomRadio from "./CusomRadio";

const fakeChoices: {value: string, name: string}[] = [
  {value: "1", name: "Test choice 1"},
  {value: "2", name: "Test choice 2"},
]

/**
 * Một component có một số đối tượng con có sử dụng đến các thành phần trả về từ custom hook
 * @returns 
 */
const CustomComponent = () => {
  const [text, setText] = useTextbox("");
  const [radios, checkedRadio, attributes] = useRadio(fakeChoices.map(x => x.value));

  return (
    <>
      <CustomTextbox value={text} id="textTest" placeholder="" />
      {
        radios.map(item => {
          return (
            <CustomRadio labelProps={{}} radioProps={{value: item, name: attributes(item).name!, checked: item == checkedRadio}} />
          )
        })
      }
    </>
  )
}

export default CustomComponent;