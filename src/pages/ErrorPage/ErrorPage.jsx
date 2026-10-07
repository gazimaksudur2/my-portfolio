import { Link, useRouteError } from "react-router-dom";
import { FiHome, FiMail, FiArrowLeft, FiCode } from "react-icons/fi";

const ErrorPage = () => {
	const error = useRouteError();
	const status = error?.status || 404;
	const title = status === 404 ? "Page not found" : "Something went wrong";
	const description =
		status === 404
			? "The page you're looking for doesn't exist or may have been moved."
			: "An unexpected error occurred. Please try again or return home.";

	return (
		<section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-bg-primary">
			{/* Background blobs — matches site palette */}
			<div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-accent-violet/5 blur-3xl pointer-events-none" />
			<div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent-cyan/5 blur-3xl pointer-events-none" />

			<div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
				{/* Back link */}
				<div className="mb-10 flex justify-start">
					<Link
						to="/"
						className="inline-flex items-center text-content-muted hover:text-accent-cyan transition-colors duration-300 font-medium"
					>
						<FiArrowLeft className="mr-2 w-4 h-4" />
						Back to portfolio
					</Link>
				</div>

				<div className="glass glow-border rounded-3xl p-8 sm:p-12">
					{/* Status badge */}
					<div className="mx-auto mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-violet/20 border border-accent-cyan/30 shadow-glow-cyan">
						<span className="text-2xl font-bold font-syne text-gradient">{status}</span>
					</div>

					{/* Logo */}
					<div className="flex items-center justify-center gap-2 mb-6">
						<FiCode className="w-5 h-5 text-accent-cyan" />
						<span className="text-sm font-medium text-content-muted">Gazi Maksudur Rahman</span>
					</div>

					<h1 className="text-4xl sm:text-5xl font-bold font-syne text-gradient mb-4">
						{title}
					</h1>

					<p className="text-lg text-content-muted max-w-md mx-auto leading-relaxed">
						{description}
					</p>

					{/* Actions */}
					<div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link
							to="/"
							className="inline-flex items-center justify-center px-8 py-4 bg-accent-cyan text-bg-primary font-semibold rounded-xl hover:bg-accent-cyan/90 transition-all duration-300 shadow-glow-cyan hover:shadow-glow-cyan-lg hover:-translate-y-1"
						>
							<FiHome className="mr-2 w-5 h-5" />
							Go Home
						</Link>
						<Link
							to="/#contact"
							className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent-cyan/50 text-accent-cyan font-semibold rounded-xl hover:bg-accent-cyan/10 hover:border-accent-cyan transition-all duration-300"
						>
							<FiMail className="mr-2 w-5 h-5" />
							Contact Me
						</Link>
					</div>

					<div className="mt-8 text-sm text-content-muted/70">
						<span>Looking for something specific? </span>
						<Link to="/#projects" className="text-accent-cyan hover:glow-cyan font-medium">
							Projects
						</Link>
						<span className="mx-2">·</span>
						<Link to="/#skills" className="text-accent-cyan hover:glow-cyan font-medium">
							Skills
						</Link>
						<span className="mx-2">·</span>
						<Link to="/#certifications" className="text-accent-cyan hover:glow-cyan font-medium">
							Certifications
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ErrorPage;
