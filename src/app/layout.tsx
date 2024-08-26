import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/assets/globals.css";
import { Providers } from "./providers";
import { ViewTransitions } from "next-view-transitions";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "IntegraServicios",
	description: "IntegraServicios es una plataforma de gestión de prestación de servicios para la universidad Distrital Francisco José de Caldas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className='light'>
			<body>
				<ViewTransitions>
					<Providers>
						{children}
					</Providers>
				</ViewTransitions>
			</body>
		</html>
	);
}
