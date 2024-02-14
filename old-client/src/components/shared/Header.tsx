// Import Next.js components for image and navigation
import Image from 'next/image';
import Link from 'next/link';

// Topbar functional component
const Header = () => {
	// Return the top navigation bar
	return (
		<header>
			<nav className='topbar'>
				{/* Top navigation bar container */}
				{/* <Link href='/' className='flex items-center gap-4'>
					<Image src='/assets/logo.svg' alt='logo' width={28} height={28} />
					<p className='text-heading3-bold text-light-1 max-xs:hidden'>cEDH-Stats</p>
				</Link> */}
				<div className='flex items-center gap-1'>
					{/* Container for additional elements */}
					<div className='block md:hidden'>
						{/* Logout button (visible on small screens) */}
						{/* <SignedIn>
						<SignOutButton>
							<div className='flex cursor-pointer'>
								<Image
									src='/assets/logout.svg'
									alt='logout'
									width={24}
									height={24}
								/>
							</div>
						</SignOutButton>
					</SignedIn> */}
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header; // Export the Topbar component
