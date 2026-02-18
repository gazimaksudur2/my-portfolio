import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../providers/Firebase.config";

const VISITOR_FLAG_KEY = "gm_portfolio_visitor_tracked_v1";

export const trackVisitor = async () => {
	if (typeof window === "undefined") return;

	try {
		const alreadyTracked = localStorage.getItem(VISITOR_FLAG_KEY);
		if (alreadyTracked) return;

		const response = await fetch("https://ipapi.co/json/");
		if (!response.ok) {
			throw new Error("Failed to fetch visitor location");
		}

		const data = await response.json();

		const payload = {
			city: data.city || null,
			region: data.region || null,
			country: data.country_name || null,
			countryCode: data.country || null,
			latitude: data.latitude ?? null,
			longitude: data.longitude ?? null,
			createdAt: serverTimestamp(),
			userAgent: navigator.userAgent || null,
		};

		await addDoc(collection(db, "visitor_stats"), payload);
		localStorage.setItem(VISITOR_FLAG_KEY, "true");
	} catch (error) {
		console.error("Visitor tracking failed:", error);
	}
};

export const getVisitorSummary = async () => {
	try {
		const snapshot = await getDocs(collection(db, "visitor_stats"));

		let total = 0;
		const countryCounts = {};

		snapshot.forEach((doc) => {
			const data = doc.data();
			const country = data.country || "Unknown";
			total += 1;
			countryCounts[country] = (countryCounts[country] || 0) + 1;
		});

		const topCountries = Object.entries(countryCounts)
			.sort((a, b) => b[1] - a[1])
			.slice(0, 3)
			.map(([country, count]) => ({ country, count }));

		return { total, topCountries };
	} catch (error) {
		console.error("Failed to load visitor summary:", error);
		return { total: 0, topCountries: [] };
	}
};

