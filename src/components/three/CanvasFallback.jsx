/**
 * Static, lightweight stand-in shown while a 3D canvas loads (Suspense)
 * or on mobile / low-power devices where the canvas is skipped entirely.
 */
const CanvasFallback = ({ variant = "field", className = "" }) => {
	if (variant === "sphere") {
		return (
			<div className={`relative flex items-center justify-center ${className}`}>
				<div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border border-accent-cyan/30 animate-glow-pulse" />
				<div className="absolute w-40 h-40 rounded-full border border-accent-violet/30 animate-spin-slow" />
				<div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 blur-xl" />
			</div>
		);
	}

	return (
		<div
			className={`absolute inset-0 bg-grid-glow [background-size:40px_40px] ${className}`}
			aria-hidden="true"
		>
			<div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-accent-cyan/10 blur-3xl" />
			<div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-accent-violet/10 blur-3xl" />
		</div>
	);
};

export default CanvasFallback;
