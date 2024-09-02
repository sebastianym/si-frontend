import { getStrapiURL } from "@/lib/utils/getStrapiURL";
import { getAuthToken } from "../get-token";

interface UnitSlug {
	slug: string;
}

const baseUrl = getStrapiURL();

export async function getUnitSlugService(slug: UnitSlug) {
    const url = new URL("/api/unit-slug", baseUrl);

    const authToken = await getAuthToken();

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ ...slug }),
            cache: "no-cache",
        });

        return response.json();
    } catch (error) {
        console.error("Units Service Error:", error);
    }
}