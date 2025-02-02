import { getResourceTypeService } from "@/data/services/resources/getResourceTypeService";
import { ResourceTypes } from "@/lib/types/ResourceType";

export default async function getResourceTypeAction(id: { id: string }) {
  const resourceType = await getResourceTypeService(id);
  return resourceType as ResourceTypes;
}
