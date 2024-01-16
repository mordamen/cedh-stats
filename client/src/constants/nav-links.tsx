'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { sidebarLinks } from '.';

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<>
			{sidebarLinks.map((link) => {
				return (
					<Link
						key={link.label}
						href={link.route}
						className={clsx(
							'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
							{
								'bg-sky-100 text-blue-600': pathname === link.route,
							}
						)}
					>
						<Image src={link.imgURL} alt={link.label} width={24} height={24} />
						<p className='hidden md:block'>{link.label}</p>
					</Link>
				);
			})}
		</>
	);
}
