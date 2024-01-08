import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/components/shared/Header';
import LeftSidebar from '@/components/shared/LeftSideBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'cEDH-Stats',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Header />
				<main>
					{/* <LeftSidebar /> */}
					<section className='main-container bg-gradient-to-r bg-cedh-blue to-indigo-700'>
						<div className='w-full'>{children}</div>
					</section>
				</main>
				{/* <Footer /> */}
			</body>
		</html>
	);
}
