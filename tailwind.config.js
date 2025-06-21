/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: '"Poppins", sans-serif',
				inter: '"Inter", sans-serif',
			},
			colors: {
				primary: {
					50: "#f0f9ff",
					100: "#e0f2fe",
					200: "#bae6fd",
					300: "#7dd3fc",
					400: "#38bdf8",
					500: "#0ea5e9",
					600: "#0284c7",
					700: "#0369a1",
					800: "#075985",
					900: "#0c4a6e",
				},
				secondary: {
					50: "#fdf4ff",
					100: "#fae8ff",
					200: "#f5d0fe",
					300: "#f0abfc",
					400: "#e879f9",
					500: "#d946ef",
					600: "#c026d3",
					700: "#a21caf",
					800: "#86198f",
					900: "#701a75",
				},
				neutral: {
					50: "#f8fafc",
					100: "#f1f5f9",
					200: "#e2e8f0",
					300: "#cbd5e1",
					400: "#94a3b8",
					500: "#64748b",
					600: "#475569",
					700: "#334155",
					800: "#1e293b",
					900: "#0f172a",
				},
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic":
					"conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
				"hero-pattern": "url('/img/hero-pattern.svg')",
			},
			animation: {
				"fade-in": "fadeIn 0.6s ease-out",
				"fade-in-up": "fadeInUp 0.6s ease-out",
				"fade-in-down": "fadeInDown 0.6s ease-out",
				"fade-in-left": "fadeInLeft 0.6s ease-out",
				"fade-in-right": "fadeInRight 0.6s ease-out",
				"slide-up": "slideUp 0.6s ease-out",
				"slide-down": "slideDown 0.6s ease-out",
				"scale-in": "scaleIn 0.6s ease-out",
				"bounce-slow": "bounce 3s infinite",
				"pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				float: "float 6s ease-in-out infinite",
				gradient: "gradient 3s ease infinite",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				fadeInUp: {
					"0%": { opacity: "0", transform: "translateY(30px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				fadeInDown: {
					"0%": { opacity: "0", transform: "translateY(-30px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				fadeInLeft: {
					"0%": { opacity: "0", transform: "translateX(-30px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				fadeInRight: {
					"0%": { opacity: "0", transform: "translateX(30px)" },
					"100%": { opacity: "1", transform: "translateX(0)" },
				},
				slideUp: {
					"0%": { transform: "translateY(100%)" },
					"100%": { transform: "translateY(0)" },
				},
				slideDown: {
					"0%": { transform: "translateY(-100%)" },
					"100%": { transform: "translateY(0)" },
				},
				scaleIn: {
					"0%": { opacity: "0", transform: "scale(0.9)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				float: {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-20px)" },
				},
				gradient: {
					"0%, 100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
			},
			backgroundSize: {
				200: "200%",
			},
			backdropBlur: {
				"4xl": "72px",
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: [
			{
				professional: {
					primary: "#0ea5e9",
					secondary: "#c855f5",
					accent: "#f59e0b",
					neutral: "#1e293b",
					"base-100": "#ffffff",
					"base-200": "#f8fafc",
					"base-300": "#e2e8f0",
					info: "#0ea5e9",
					success: "#10b981",
					warning: "#f59e0b",
					error: "#ef4444",
				},
			},
			"light",
			"dark",
		],
	},
};
