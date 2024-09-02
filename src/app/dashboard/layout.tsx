'use client'

import { LogoutButton } from "@/components/custom/LogoutButton";
import { Link } from "next-view-transitions";
import { useEffect, useRef, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { FaBookOpen } from "react-icons/fa";
import { IoIosCheckboxOutline } from "react-icons/io";
import { IoPerson } from "react-icons/io5";
import { logoutAction } from "@/data/actions/auth/logoutAction";
import { BsArrowReturnLeft } from "react-icons/bs";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

	const [menu, setMenu] = useState(false);
	const menuRef = useRef<HTMLElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuRef.current &&
				!menuRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setMenu(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [menu]);

	return (
		<div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
			<div className="layout-container flex h-full grow flex-col">
				<header className="flex xl:px-32 items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
					<div className="flex items-center gap-4 text-[#111418]">
						<div className="size-4">
							<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z"
									fill="currentColor"
								></path>
							</svg>
						</div>
						<h2 className="text-[#111418] text-lg font-semibold leading-tight tracking-[-0.015em]">Universidad Distrital <span className="max-lg:hidden">Francisco José de Caldas</span></h2>
					</div>

					<button ref={buttonRef} onClick={(e) => { e.stopPropagation(); setMenu(!menu); }} className="inline-flex relative z-10 items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
						<svg className="w-6 h-6 pointer-events-none" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
							<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
						</svg>
					</button>

					<div className="flex flex-1 justify-end gap-8 max-lg:hidden">
						<div className="flex items-center gap-9">
							<Link className="text-[#111418] text-sm font-medium leading-normal" href="/dashboard">Dashboard</Link>
							<a className="text-[#111418] text-sm font-medium leading-normal" href="#">Reservar</a>
							<a className="text-[#111418] text-sm font-medium leading-normal" href="#">Mis reservaciones</a>
							<Link className="text-[#111418] text-sm font-medium leading-normal" href="/dashboard/perfil">Perfil</Link>
						</div>
						<div className="flex gap-2">
							<form action={logoutAction}>
								<button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 bg-[#f0f2f4] text-[#111418] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-3.5">
									<div className="text-[#111418]" data-icon="MagnifyingGlass" data-size="20px" data-weight="regular">
										<BsArrowReturnLeft className="mt-1" />
									</div>
									<p className="font-medium">Cerrar sesión</p>
								</button>
							</form>
						</div>
					</div>

					<aside ref={menuRef} className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${!menu && '-translate-x-full'} bg-gray-50 border-r border-gray/20 lg:hidden`} aria-label="Sidebar">
						<h2 className="p-5 font-semibold">Menú de navegación</h2>
						<div className="h-full px-3 py-2 overflow-y-auto bg-gray-50 dark:bg-gray-800">
							<ul className="space-y-2 font-medium">
								<li>
									<a href="#" className="flex items-center p-2 rounded-lg text-black/60 hover:bg-gray/10">
										<MdSpaceDashboard className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-black/60" />
										<span className="ms-4 whitespace-nowrap">Dashboard</span>
									</a>
								</li>
								<li>
									<a href="#" className="flex items-center p-2 rounded-lg text-black/60 hover:bg-gray/10">
										<FaBookOpen className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-black/60" />
										<span className="ms-4 whitespace-nowrap">Reservar</span>
									</a>
								</li>
								<li>
									<a href="#" className="flex items-center p-2 rounded-lg text-black/60 hover:bg-gray/10">
										<IoIosCheckboxOutline className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-black/60" />
										<span className="ms-4 whitespace-nowrap">Mis reservas</span>
									</a>
								</li>
								<li>
									<a href="#" className="flex items-center p-2 rounded-lg text-black/60 hover:bg-gray/10">
										<IoPerson className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-black/60" />
										<span className="ms-4 whitespace-nowrap">Perfil</span>
									</a>
								</li>
								<li>
									<LogoutButton />
								</li>
							</ul>
						</div>
					</aside>
				</header>
				<div className="flex flex-1 justify-center mb-10">
					{children}
				</div>
			</div>
		</div>
	);
}