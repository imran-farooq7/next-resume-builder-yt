import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
	title: "Next Resume Builder",
	description: "Worldclass Resume Builder for Dev",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
