'use client'

import { LogoutButton } from "@/components/custom/LogoutButton";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BsFillGridFill, BsFillPersonFill } from "react-icons/bs";
import { IoLayers } from "react-icons/io5";




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

	const pathname = usePathname();
	const isCurrentPath = (path: string) => pathname === path;

	return (
		<div>
			<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray/20">
				<div className="px-3 py-3 lg:px-5 lg:pl-3">
					<div className="flex items-center justify-between">
						<div className="flex items-center justify-start rtl:justify-end">
							<button ref={buttonRef} onClick={(e) => { e.stopPropagation(); setMenu(!menu); }} className="inline-flex relative z-10 items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
								<svg className="w-6 h-6 pointer-events-none" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
									<path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
								</svg>
							</button>

							<div className="flex ms-2 lg:me-24 gap-x-2 items-center">
								<span className="self-center text-xl font-semibold sm:text-lg whitespace-nowrap text-black/80">IntegraServicios</span>
								<span className='bg-blue-500 rounded-md px-2 py-0.5 text-white text-xs h-fit'>Universidad Distrital</span>
							</div>

						</div>
						<div className="flex items-center max-lg:hidden">
							<div>
								<p className='text-black/60'>Sistema de préstamos de la Universidad Distrital</p>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<aside ref={menuRef} className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${!menu && '-translate-x-full'} bg-white border-r border-gray/20 lg:translate-x-0`} aria-label="Sidebar">
				<div className="h-full px-3 pb-4 overflow-y-auto bg-white">
					<ul className="space-y-2 font-medium">
						<li>
							<Link href={'/dashboard'} className={`flex items-center p-2 rounded-lg text-black/60 ${isCurrentPath('/dashboard') ? 'bg-gray/10' : ''} group`}>
								<BsFillGridFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-black/60" />
								<span className="ms-3">Dashboard</span>
							</Link>
						</li>
						<li>
							<Link href={'/dashboard/perfil'} className={`flex items-center p-2 rounded-lg text-black/60 hover:bg-gray/10 ${isCurrentPath('/dashboard/perfil') ? 'bg-gray/10' : ''} group`}>
								<BsFillPersonFill className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-black/60" />
								<span className="flex-1 ms-3 whitespace-nowrap">Mi perfil</span>
							</Link>
						</li>
						<li>
							<Link href={'/dashboard/servicios'} className={`flex items-center p-2 rounded-lg text-black/60 hover:bg-gray/10 ${isCurrentPath('/dashboard/servicios') ? 'bg-gray/10' : ''} group`}>
								<IoLayers className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-black/60" />
								<span className="flex-1 ms-3 whitespace-nowrap">Mis reservas</span>
							</Link>
						</li>
						<li>
							<LogoutButton></LogoutButton>
						</li>
					</ul>
				</div>
			</aside>

			<div className="lg:p-4 lg:ml-64 min-h-screen bg-gray-100">
				<div className="lg:p-4 mt-14 sm:p-8">
					{children}
				</div>
			</div>
		</div>
	);
}