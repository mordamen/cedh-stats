'use client';

import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/source/config/site';
import { usePathname } from 'next/navigation';

const Footer = () => {
	const pathname = usePathname();

	return (
		<>
			<footer className='bottombar'>
				<div className='bottombar_container'>
					{siteConfig.navItems.map((link) => {
						const isActive = (pathname.includes(link.href) && link.href.length > 1) || pathname === link.href;

						return (
							<Link href={link.href} key={link.label} className={`bottombar_link ${isActive && 'bg-primary-500'}`}>
								<Image src={link.imgURL} alt={link.label} width={16} height={16} className='object-contain' />

								<p className='text-subtle-medium text-light-1 max-sm:hidden'>{link.label.split(/\s+/)[0]}</p>
							</Link>
						);
					})}
				</div>
			</footer>
		</>
	);
};

export default Footer;
