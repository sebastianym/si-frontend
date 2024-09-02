
import { getUnitSlugService } from "@/data/services/units/getUnitSlugService";
import { Unit } from "@/lib/types/Unit";

export default async function getUnitSlugAction(slug: {slug: string;}) {
    const unit = await getUnitSlugService(slug);
    return unit as Unit;
}