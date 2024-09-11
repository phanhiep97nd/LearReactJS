import CoreNumberbox from "./CoreNumberbox";

const PanelExample = () => {
		const valTest = 20;
		return (
		/** Giá trị truyền cho label là 1 chuỗi */
		/** Giá trị truyền cho val là 1 expression */
				<CoreNumberbox label="Test" val={valTest} />
		)
}