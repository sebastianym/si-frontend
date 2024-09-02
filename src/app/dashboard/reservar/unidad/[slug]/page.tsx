"use client"

import { Results } from "@/components/custom/Results";
import getResourcesUnitTypeAction from "@/data/actions/resources/getResourcesUnitTypeAction";
import getUnitSlugAction from "@/data/actions/units/getUnitSlugAction";
import { Resource } from "@/lib/types/Resource";
import { Unit } from "@/lib/types/Unit";
import { formatLoanTime } from "@/lib/utils/formatLoanTime";
import { parseDayOfWeek } from "@/lib/utils/parseDayOfWeek";
import { parseTime } from "@/lib/utils/parseTime";
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { LuLoader2 } from "react-icons/lu";

export default function Page({ params }: { params: { slug: string } }) {

    const [unit, setUnit] = useState<Unit | null>(null);
    const [resourceType, setResourceType] = useState("");
    const [resources, setResources] = useState<Resource[] | null>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 20;

    useEffect(() => {
        const fetchUnit = async () => {
            const unitObtained = await getUnitSlugAction({ slug: params.slug });
            console.log(unitObtained);
            setUnit(unitObtained);
        }
        fetchUnit();
    }, []);

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            try {
                const resourcesObtained = await getResourcesUnitTypeAction({ identifier: resourceType, page: currentPage, pageSize });
                setTotalPages(resourcesObtained.meta.pagination.pageCount)
                setResources(resourcesObtained.data);
            } catch (error) {
                console.error("Error fetching resources:", error);
                setResources([]);
            } finally {
                setLoading(false);
            }
        }

        if (resourceType) {
            fetchResources();
        } else {
            setResources(null);
        }
    }, [resourceType, currentPage]);


    if (!unit) {
        return (
            <div className="flex flex-col justify-center items-center animate-pulse">
                <LuLoader2 size={26} className="mr-2 text-black/50 animate-spin mb-5" />
                <p className="text-black/80">Cargando información de la unidad...</p>
            </div>
        )
    }

    if (unit.is_active === true) {
        return (
            <div className="container my-5 md:my-10 px-8 py-4">
                <div className="md:flex gap-10">

                    <div className="md:hidden">
                        <span className="font-semibold text-gray-400 text-sm mb-2">UNIDAD</span>
                        <h1 className="text-3xl font-bold mb-2">{unit.name}</h1>
                        <p className=" mb-5">{unit.description}</p>
                    </div>

                    <div className="md:w-1/4 w-full max-md:h-[230px]" style={{
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.7) 100%), url(${unit.image.url})`,
                        borderRadius: "20px",
                    }}>
                    </div>

                    <div className="md:w-3/4">
                        <div className="max-md:hidden">
                            <span className="font-semibold text-gray-400 text-sm mb-2">UNIDAD</span>
                            <h1 className="text-3xl font-bold mb-2">{unit.name}</h1>
                            <p className="">{unit.description}</p>
                        </div>

                        <div className="mt-4">
                            <div className="md:hidden mb-5">
                                <h2 className="text-xl font-semibold">Horarios de atención</h2>
                            </div>
                            <div className="grid xl:grid-cols-7 md:grid-cols-3 lg:grid-cols-4 max-md:grid-cols-2  md:gap-2 gap-4">
                                {unit.schedule && unit.schedule.map((schedule) => (
                                    <div key={schedule.id} className="bg-gray-100 text-gray-500 px-3 py-2 rounded-md">
                                        <p className="font-semibold">{parseDayOfWeek(schedule.dayOfWeek)}</p>
                                        <p>{parseTime(schedule.startTime)} - {parseTime(schedule.endTime)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-fit mt-5 bg-blue-300/30 rounded xl:p-3.5 p-6 flex items-center gap-x-3 text-black">
                            <BsInfoCircle size={16} className="ml-2 max-xl:hidden" />
                            <p className="pr-5 max-md:text-center">El tiempo mínimo de préstamo es de {formatLoanTime(unit.minimumLoanTime)}</p>
                        </div>
                    </div>
                </div>


                <div className="mt-10 mb-10">
                    <h2 className="text-2xl font-semibold">Selecciona una categoría</h2>
                    <div className="flex flex-wrap gap-4 mt-5">
                        {unit.resource_types && unit.resource_types.map((unitType) => (
                            <div
                                key={unitType.identifier}
                                onClick={() => setResourceType(unitType.identifier)}
                                className={`md:px-14 px-8 py-3 transition-colors rounded-md cursor-pointer ${resourceType === unitType.identifier ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}
                            >
                                <p className="font-semibold">{unitType.name}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    {loading ? (
                        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse transition-all">
                            <div className=" flex flex-col justify-between rounded-3xl border hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
                                <div className="overflow-visible p-0 relative">
                                    <div className="w-full h-[180px] bg-gray-300 rounded-t-3xl">
                                    </div>
                                    <div className="flex items-center gap-x-1 absolute bg-gray-400/30 text-white px-3 w-32 h-6 text-sm py-0.5 rounded-md top-4 right-4">
                                    </div>
                                    <div className="p-5 pb-3">
                                        <div className="w-2/3 h-8 rounded-md bg-gray-300 mb-2"></div>
                                        <p className="w-full h-4 rounded-md bg-gray-300 mb-2"></p>
                                        <p className="w-full h-4 rounded-md bg-gray-300"></p>
                                    </div>
                                </div>
                                <div className="p-5 pt-0">
                                    <div className="w-full h-11 rounded-md bg-gray-300"></div>
                                </div>
                            </div>
                        </div>
                    ) : resourceType === "" ? (
                        null
                    ) : resources && resources.length > 0 ? (
                        <div>
                            <div className="mb-10">
                                <Results results={resources} />
                            </div>
                            <div>
                                <Pagination showControls onChange={(page: number) => setCurrentPage(page)} total={totalPages} initialPage={currentPage} />
                            </div>
                        </div>

                    ) : (
                        <p>No hay resultados para el tipo de recurso seleccionado.</p>
                    )}
                </div>
            </div>
        );
    } else {
        return <div>La unidad no está disponible</div>
    }


}