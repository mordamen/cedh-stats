// Import Clerk authentication components and themes
import { OrganizationSwitcher, SignedIn, SignOutButton } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
// Import Next.js components for image and navigation
import Image from 'next/image';
import Link from 'next/link';

// Topbar functional component
function Topbar() {
	// Return the top navigation bar
	return (
		<nav className='topbar'>
			{/* Top navigation bar container */}
			<Link href='/' className='flex items-center gap-4'>
				{/* Logo and site name */}
				<Image src='/assets/logo.svg' alt='logo' width={28} height={28} />
				<p className='text-heading3-bold text-light-1 max-xs:hidden'>Threads</p>
			</Link>
			<div className='flex items-center gap-1'>
				{/* Container for additional elements */}
				<div className='block md:hidden'>
					{/* Logout button (visible on small screens) */}
					<SignedIn>
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
					</SignedIn>
				</div>
				<OrganizationSwitcher
					appearance={{
						baseTheme: dark,
						elements: {
							organizationSwitcherTrigger: 'py-2 px-4', // Styling for organization switcher trigger
						},
					}}
				/>
			</div>
		</nav>
	);
}

export default Topbar; // Export the Topbar component
