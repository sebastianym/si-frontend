import { getStrapiURL } from "@/lib/utils/getStrapiURL";
import { getAuthToken } from "../get-token";

interface ResourceId {
  id: string;
}

const baseUrl = getStrapiURL();

export async function getResourceTypeService(id: ResourceId) {
  const url = new URL(`/api/resource-types/${id.id}?populate=*`, baseUrl);

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
    console.error("Resource type Service Error:", error);
  }
}
