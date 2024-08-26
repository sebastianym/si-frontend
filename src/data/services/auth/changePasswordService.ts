import { getStrapiURL } from "@/lib/utils/getStrapiURL";

interface ChangePasswordProps {
	originalPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const baseUrl = getStrapiURL();

export async function changePasswordService(userData: ChangePasswordProps) {
	const url = new URL("/api/auth/forgot-password", baseUrl);

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...userData }),
			cache: "no-cache",
		});

		return response.json();
	} catch (error) {
		console.error("Login Service Error:", error);
		throw error;
	}
}