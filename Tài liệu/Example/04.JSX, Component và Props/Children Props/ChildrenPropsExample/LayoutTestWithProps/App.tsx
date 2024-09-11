import Layout from './Layout';
import { MainContent } from './MainContent';

const App = () => {
	 /** MainContent được truyền vào như là một children props */
	return (
		<Layout sidebar={<p>Đây là nội dung của Sidebar</p>}>
			<MainContent />
		</Layout>
	);
};

export default App;