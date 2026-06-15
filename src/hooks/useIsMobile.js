import { useEffect, useState } from "react";

/**
 * Returns true when the viewport width is below `breakpoint` (default 768px).
 * Used to skip heavy 3D canvases on small / low-power devices.
 */
export const useIsMobile = (breakpoint = 768) => {
	const [isMobile, setIsMobile] = useState(() => {
		if (typeof window === "undefined") return false;
		return window.innerWidth < breakpoint;
	});

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [breakpoint]);

	return isMobile;
};

export default useIsMobile;
