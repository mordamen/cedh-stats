'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/source/config/site';
import clsx from 'clsx';

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<>
			{siteConfig.navItems.map((link) => {
				return (
					<Link
						key={link.label}
						href={link.href}
						className={clsx(
							'flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue md:flex-none md:justify-start md:p-2 md:px-3 md:group-hover:flex group-hover:color-blue',
							{
								' text-blue': pathname === link.href,
							}
						)}
					>
						<Image src={link.imgURL} alt={link.label} width={24} height={24} />
						<span className='hidden md:group-hover:flex'>{link.label}</span>
					</Link>
				);
			})}
		</>
	);
}
