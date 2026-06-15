/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: '"Poppins", sans-serif',
				inter: '"Inter", sans-serif',
				syne: '"Syne", system-ui, sans-serif',
				grotesk: '"Space Grotesk", system-ui, sans-serif',
				sans: '"Space Grotesk", system-ui, sans-serif',
				heading: '"Syne", system-ui, sans-serif',
			},
			colors: {
				bg: {
					primary: "#0a0a0f",
					secondary: "#0d0d1a",
					card: "#111127",
				},
				accent: {
					cyan: "#00f5ff",
					violet: "#7c3aed",
					green: "#00ff88",
				},
				content: {
					primary: "#f0f0ff",
					muted: "#8888aa",
				},
				glow: "rgba(0, 245, 255, 0.2)",
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
				"grid-glow":
					"linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)",
			},
			boxShadow: {
				"glow-cyan": "0 0 24px rgba(0, 245, 255, 0.35)",
				"glow-cyan-lg": "0 0 48px rgba(0, 245, 255, 0.45)",
				"glow-violet": "0 0 24px rgba(124, 58, 237, 0.45)",
				"glow-green": "0 0 24px rgba(0, 255, 136, 0.4)",
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
		darkTheme: "portfolioDark",
		themes: [
			{
				portfolioDark: {
					primary: "#00f5ff",
					secondary: "#7c3aed",
					accent: "#00ff88",
					neutral: "#111127",
					"base-100": "#0a0a0f",
					"base-200": "#0d0d1a",
					"base-300": "#111127",
					info: "#00f5ff",
					success: "#00ff88",
					warning: "#f59e0b",
					error: "#ef4444",
				},
			},
			"dark",
		],
	},
};
