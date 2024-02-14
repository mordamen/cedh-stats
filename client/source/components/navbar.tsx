import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
	Button,
	Kbd,
	Link,
	Input,
} from '@nextui-org/react';

import { link as linkStyles } from '@nextui-org/theme';

import { siteConfig } from '@/source/config/site';
import NextLink from 'next/link';
import clsx from 'clsx';

import { ThemeSwitch } from './theme-switch';
import { Logo, TwitterIcon, GithubIcon, DiscordIcon, HeartFilledIcon, SearchIcon } from './icons';

export const Navbar = () => {
	const searchInput = (
		<Input
			aria-label='Search'
			classNames={{
				inputWrapper: 'bg-default-100',
				input: 'text-sm',
			}}
			endContent={
				<Kbd className='hidden lg:inline-block' keys={['command']}>
					K
				</Kbd>
			}
			labelPlacement='outside'
			placeholder='Search...'
			startContent={<SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />}
			type='search'
		/>
	);

	return (
		<NextUINavbar
			classNames={{
				base: 'navbar-base',
				wrapper: 'navbar-wrapper',
				content: 'navbar-content',
				item: 'navbar-item',
			}}
			position='sticky'
		>
			<NavbarContent justify='start'>
				<NavbarBrand as='li' className='gap-3 max-w-fit'>
					<NextLink className='flex justify-start items-center gap-1' href='/'>
						<Logo />
						<p className='font-bold text-inherit'>ACME</p>
					</NextLink>
				</NavbarBrand>
				<ul className='flex-col gap-4 justify-start ml-2'>
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: 'foreground' }),
									'data-[active=true]:text-primary data-[active=true]:font-medium'
								)}
								color='foreground'
								href={item.href}
							>
								{item.label}
							</NextLink>
						</NavbarItem>
					))}
				</ul>
			</NavbarContent>

			<NavbarContent className=' sm:flex basis-1/5 sm:basis-full' justify='end'>
				<NavbarItem className=' sm:flex gap-2'>
					{/* <Link isExternal href={siteConfig.links.twitter} aria-label='Twitter'>
						<TwitterIcon className='text-default-500' />
					</Link>
					<Link isExternal href={siteConfig.links.discord} aria-label='Discord'>
						<DiscordIcon className='text-default-500' />
					</Link>
					<Link isExternal href={siteConfig.links.github} aria-label='Github'>
						<GithubIcon className='text-default-500' />
					</Link> */}
					<ThemeSwitch />
				</NavbarItem>
				{/* <NavbarItem className=' lg:flex'>{searchInput}</NavbarItem>
				<NavbarItem className=' md:flex'>
					<Button
						isExternal
						as={Link}
						className='text-sm font-normal text-default-600 bg-default-100'
						href={siteConfig.links.sponsor}
						startContent={<HeartFilledIcon className='text-danger' />}
						variant='flat'
					>
						Sponsor
					</Button>
				</NavbarItem> */}
			</NavbarContent>

			<NavbarContent className='md:hidden basis-1 pl-4' justify='end'>
				<Link isExternal href={siteConfig.links.github} aria-label='Github'>
					<GithubIcon className='text-default-500' />
				</Link>
				<ThemeSwitch />
				<NavbarMenuToggle />
			</NavbarContent>

			<NavbarMenu>
				{searchInput}
				<div className='md:hidden mx-4 mt-2 flex flex-col gap-2'>
					{siteConfig.navMenuItems.map((item, index) => (
						<NavbarMenuItem key={`${item}-${index}`}>
							<Link
								color={index === 2 ? 'primary' : index === siteConfig.navMenuItems.length - 1 ? 'danger' : 'foreground'}
								href='#'
								size='lg'
							>
								{item.label}
							</Link>
						</NavbarMenuItem>
					))}
				</div>
			</NavbarMenu>
		</NextUINavbar>
	);
};
