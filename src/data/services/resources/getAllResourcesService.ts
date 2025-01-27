import { getStrapiURL } from "@/lib/utils/getStrapiURL";
import { getAuthToken } from "../get-token";

const baseUrl = getStrapiURL();

export async function getAllResourcesService() {
  const url = new URL("/api/resources?populate=*", baseUrl);

  const authToken = await getAuthToken();

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-cache",
    });

    return response.json();
  } catch (error) {
    console.error("Resources Service Error:", error);
  }
}
