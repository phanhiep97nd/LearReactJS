import React from "react";
import OriginalComponent from "./OriginalComponent";

/**
 * Khởi tạo HOC
 */
const withExtraProps = (Component: React.ComponentType) => {
  // Trả về Component có bổ sung thêm một số props
		return (props: any) => <Component {...props} extraProp="extraValue" />;
};

const EnhancedComponent = withExtraProps(OriginalComponent);