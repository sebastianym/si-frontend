"use client";

import { ResultsSearch } from "@/components/custom/ResultsSearch";
import getAllResourcesAction from "@/data/actions/resources/getAllResourcesAction";
import { Resource } from "@/lib/types/Resource";
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";

export default function Buscador({ params }: { params: { slug: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [resources, setResources] = useState<Resource[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const resourcesObtained = await getAllResourcesAction();
        const normalizeString = (str: string) =>
          str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, "");

        const filteredResources = resourcesObtained.data.filter(
          (resource: any) => {
            const name = normalizeString(resource.attributes.name);
            const identifier = normalizeString(resource.attributes.identifier);
            const slug = normalizeString(params.slug);
            return name.includes(slug) || identifier.includes(slug);
          }
        );
        setResources(filteredResources);
      } catch (error) {
        console.error("Error fetching resources:", error);
        setResources(null);
      } finally {
        setLoading(false);
      }
    };
    fetchResource();
  }, []);

  if (!resources && loading) {
    return (
      <div className="flex flex-col justify-center items-center animate-pulse">
        <LuLoader2 size={26} className="mr-2 text-black/50 animate-spin mb-5" />
        <p className="text-black/80">Cargando busqueda del recurso...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse transition-all">
        <div className=" flex flex-col justify-between rounded-3xl border hover:translate-x-0.5 hover:-translate-y-0.5 transition-all">
          <div className="overflow-visible p-0 relative">
            <div className="w-full h-[180px] bg-gray-300 rounded-t-3xl"></div>
            <div className="flex items-center gap-x-1 absolute bg-gray-400/30 text-white px-3 w-32 h-6 text-sm py-0.5 rounded-md top-4 right-4"></div>
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
    );
  }

  if (resources && resources.length > 0) {
    return (
      <div className="mt-10">
        <div className="mb-10">
          <ResultsSearch results={resources} />
        </div>
        <div>
          <Pagination
            showControls
            onChange={(page: number) => setCurrentPage(page)}
            total={totalPages}
            initialPage={currentPage}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="text-black/80">
          No hay resultados para el tipo de busqueda.
        </p>
      </div>
    );
  }
}
