import { getResourcesUnitTypeService } from "@/data/services/resources/getResourcesUnitTypeService";
import { ResourcesResponse } from "@/lib/types/Resource";

export default async function getResourcesUnitTypeAction(resourceFilter: { identifier: string; page: number; pageSize: number }) {
    const resource = await getResourcesUnitTypeService(resourceFilter);
    return resource as ResourcesResponse;
}