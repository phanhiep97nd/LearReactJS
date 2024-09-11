import React from 'react';
import './Layout.css'; // CSS cho layout

interface Props {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Hiển thị cấu trúc Layout. Với children là component con truyền vào
 */
const Layout: React.FC<Props> = ({ sidebar, children }) => {			
	return (
		<div className="layout">
			<aside className="sidebar">{sidebar}</aside>
			<main className="mainContent">{children}</main>
		</div>
	);
};

export default Layout;