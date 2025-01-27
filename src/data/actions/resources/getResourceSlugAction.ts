import { getResourceSlugService } from "@/data/services/resources/getResourceSlugService";
import { Resource } from "@/lib/types/Resource";

export default async function getResourceSlugAction(slug: { slug: string }) {
  const resource = await getResourceSlugService(slug);
  return resource as Resource;
}
