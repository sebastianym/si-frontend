import { getStrapiURL } from "@/lib/utils/getStrapiURL";
import { getAuthToken } from "../get-token";

interface ResourceFilter {
    identifier: string; // Tipo de recurso
    page: number;
    pageSize: number;
}

const baseUrl = getStrapiURL();

export async function getResourcesUnitTypeService(resourceFilter: ResourceFilter) {
    const url = new URL("/api/resources-filter/unit-and-resource-type", baseUrl);

    const authToken = await getAuthToken();

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ ...resourceFilter }),
            cache: "no-cache",
        });

        return response.json();
    } catch (error) {
        console.error("Resources Service Error:", error);
    }
}