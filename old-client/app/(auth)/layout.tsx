import { Inter } from 'next/font/google';

import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function ({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={`${inter.className} bg-dark-1`}>{children}</body>
		</html>
	);
}
