import '@/styles/globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/constants/site';
import { fontSans } from '@/src/constants/fonts';
import { Providers } from './providers';
import { Link } from '@nextui-org/react';
import clsx from 'clsx';
import 'dotenv/config';

import { SideNav as Navbar, SideNav } from '@/components/shared/SideNav';
import Footer from '@/components/shared/Footer';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
	icons: {
		icon: '/favicon.ico',
		shortcut: '/favicon-16x16.png',
		apple: '/apple-touch-icon.png',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' className='dark'>
			<body className={`${fontSans.className} antialiased flex flex-row `}>
				{/* <Providers> */}
				<main className='main-container '>
					<SideNav />
					<section className='w-full'>{children}</section>
				</main>
				<Footer />
				{/* </Providers> */}
			</body>
		</html>
	);
}
