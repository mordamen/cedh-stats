// import Link from 'next/link';
import Image from 'next/image';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from '@nextui-org/react';
import { FaSuperpowers } from 'react-icons/fa6';
import NavLinks from './nav-links';
import { Logo } from '../icons';

export function SideNav() {
	return (
		<>
			<nav className='leftsidebar px-3 py-4 md:px-2 bg-lighter-blue shadow-modal items-center group'>
				<Link className=' mb-2 flex h-20 items-center justify-start gap-4 rounded-md  p-4 md:h-20' href='/'>
					<Image src='/logo.svg' alt='logo' width={28} height={28} />
					<span className='text-heading3-bold text-white hidden md:group-hover:flex'>cEDH-Stats</span>
				</Link>
				<div className='group flex flex-row justify-between grow space-x-2 md:flex-col md:space-x-0 md:space-y-2 text-white'>
					<NavLinks />
					<div className='hidden md:block h-auto w-full grow rounded-md'></div>
					<form id='logoutButton'>
						<button className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md  p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'>
							<FaSuperpowers className='w-6' />
							<div className='hidden md:group-hover:flex'>Sign Out</div>
						</button>
					</form>
				</div>
			</nav>
		</>
	);
}
