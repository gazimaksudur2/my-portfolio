import { Link, useRouteError } from "react-router-dom";
import { FiHome, FiMail, FiArrowLeft } from "react-icons/fi";

const ErrorPage = () => {
  const error = useRouteError();
  const status = error?.status || 404;
  const title =
    status === 404 ? "Page not found" : "Something went wrong";
  const description =
    status === 404
      ? "The page you’re looking for doesn’t exist or may have been moved."
      : "An unexpected error occurred. Please try again or return home.";

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-neutral-50 via-white to-primary-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-br from-primary-200 to-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-br from-secondary-200 to-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Back link */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center text-neutral-600 hover:text-primary-600 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back to home
          </Link>
        </div>

        <div className="bg-white/70 backdrop-blur-xl border border-neutral-200 rounded-3xl shadow-xl p-8 sm:p-12 text-center animate-fade-in-up">
          {/* 404 badge */}
          <div className="mx-auto mb-6 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-lg">
            {status}
          </div>

          {/* Big gradient heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent leading-tight">
            {title}
          </h1>

          {/* Message */}
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl mx-auto">
            {description}
          </p>

          {/* Helpful hints */}
          <div className="mt-6 text-sm text-neutral-500">
            <p>
              If you typed the URL directly, please make sure the spelling is correct.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FiHome className="mr-2 w-5 h-5" />
              Go Home
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary-500 text-primary-600 font-semibold rounded-xl hover:bg-primary-50 transition-all duration-300"
            >
              <FiMail className="mr-2 w-5 h-5" />
              Contact Me
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-8 text-sm text-neutral-600">
            <span className="mr-2">Looking for something else?</span>
            <Link
              to="/#projects"
              className="text-primary-600 hover:underline font-medium"
            >
              See my projects
            </Link>
            <span className="mx-2">•</span>
            <Link
              to="/#services"
              className="text-primary-600 hover:underline font-medium"
            >
              Explore services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;