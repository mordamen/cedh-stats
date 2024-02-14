import '@/styles/globals.css';
import { Metadata } from 'next';
import { siteConfig } from '@/source/config/site';
import { fontSans } from '@/source/config/fonts';
import { Providers } from './providers';
import { Navbar } from '@/components/navbar';
import Footer from '@/source/components/ui/footer';
import clsx from 'clsx';

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
};

export const viewport = {
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
		<html lang='en'>
			<head />
			<body className={clsx('bg-background font-sans antialiased ', fontSans.variable)}>
				<Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
					<Navbar />
					<main className=''>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
