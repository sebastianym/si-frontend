'use client'

import { Loader } from "@/components/custom/Loader";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function PerfilLayout({ children }: { children: React.ReactNode }) {

	const router = useRouter();
	const pathname = usePathname();
	const [loadingPath, setLoadingPath] = useState<string | null>(null);

	const isCurrentPath = (path: string) => pathname === path;

	const handleClick = (path: string) => {
		setLoadingPath(path);
		router.push(path);
	};

	useEffect(() => {
		if (loadingPath && pathname === loadingPath) {
			setLoadingPath(null);
		}
	}, [pathname, loadingPath]);

	if (status === 'loading') {
		return (
			<div className="flex justify-center items-center flex-col gap-5 border rounded-lg animate-pulse py-20">
				<p>Cargando contenido...</p>
			</div>
		)
	}

	return (
		<>
			<div className="relative">
				<h1 className='text-2xl font-semibold text-black/70 mb-6 max-sm:pt-8 max-sm:pl-5'>Mi información personal</h1>
				<div className=" lg:grid grid-cols-6 rounded-lg bg-white dark:bg-gray-800 p-4 border border-black/10 py-8">
					<div className="lg:col-span-1 col-span-2 row-span-5 h-fit">
						<aside className="z-40 w-auto transition-transform" aria-label="Sidebar">
							<div className="px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
								<ul className="space-y-2 font-medium">
									<li>
										<div onClick={() => handleClick('/dashboard/perfil')} className={`flex cursor-pointer items-center gap-x-3 p-2 rounded-lg text-gray-700 hover:bg-blue-500/20 hover:font-semibold ${isCurrentPath('/dashboard/perfil') ? 'bg-blue-500/20' : 'text-gray-900'} group`}>
											<span className="ms-3">Mi perfil</span>
											{loadingPath === '/dashboard/perfil' && (
												<Loader></Loader>
											)}
										</div>
									</li>
									<li>
										<div onClick={() => handleClick('/dashboard/perfil/seguridad')} className={`flex cursor-pointer items-center gap-x-3 p-2 rounded-lg text-gray-700 hover:bg-blue-500/20 hover:font-semibold ${isCurrentPath('/dashboard/perfil/seguridad') ? 'bg-blue-500/20' : 'text-gray-900'} group`}>
											<span className="ms-3">Seguridad</span>
											{loadingPath === '/dashboard/perfil/seguridad' && (
												<Loader></Loader>
											)}
										</div>
									</li>
								</ul>
							</div>
						</aside>
					</div>
					<div className="lg:col-span-5 col-span-4 col-start-2 row-span-4 bg-white dark:bg-gray-800 rounded-lg ">
						<div className="relative px-4 py-2 overflow-x-auto sm:rounded-lg">
							{children}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}