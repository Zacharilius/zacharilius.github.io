import React, { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import zbImage from '../favicon.ico';
import { NavigationItem } from '../App';

interface NavProps {
  navigationItems: NavigationItem[],
  setNavHref: React.Dispatch<React.SetStateAction<string>>,
  activeNavHref: string,
}

export default function Nav({navigationItems, setNavHref, activeNavHref}: NavProps) {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const getNavItemStyle = (navHref: string) => {
		if (navHref === activeNavHref) {
			return {
				color: '#19A295',
			}
		}
	}

	const onClickMobileNavItem = (navHref: string) => {
		setMobileMenuOpen(false);
		setNavHref(navHref);
	}

	return (
		<header className="inset-x-0">
			<nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 bg-white">
				<div className="flex lg:flex-1">
					<a href="#" className="-m-1.5 p-1.5">
						<span className="sr-only">Your Company</span>
						<img
							alt="ZB Logo"
							src={zbImage}
							className="h-8 w-auto"
							onClick={() => setNavHref(navigationItems[0].href)}
						/>
					</a>
				</div>
				<div className="flex lg:hidden">
					<button
						type="button"
						onClick={() => setMobileMenuOpen(true)}
						className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
					>
						<span className="sr-only">Open main menu</span>
						<Bars3Icon aria-hidden="true" className="size-6" />
					</button>
				</div>
				<div className="hidden lg:flex lg:gap-x-12">
					{navigationItems.map((item) => (
						<a
							key={item.name}
							href={item.href}
							onClick={() => setNavHref(item.href)}
							className="text-sm/6 font-semibold text-gray-900"
							style={getNavItemStyle(item.href)}
						>
							{item.name}
						</a>
					))}
				</div>
			</nav>
			<Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
				<div className="fixed inset-0 z-50" />
				<DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
					<div className="flex items-center justify-between">
						<a href="#" className="-m-1.5 p-1.5">
							<span className="sr-only">Your Company</span>
							<img
								alt="ZB Logo"
								src={zbImage}
								className="h-8 w-auto"
							/>
						</a>
						<button
							type="button"
							onClick={() => setMobileMenuOpen(false)}
							className="-m-2.5 rounded-md p-2.5 text-gray-700"
						>
							<span className="sr-only">Close menu</span>
							<XMarkIcon aria-hidden="true" className="size-6" />
						</button>
					</div>
					<div className="mt-6 flow-root">
						<div className="-my-6 divide-y divide-gray-500/10">
							<div className="space-y-2 py-6">
								{navigationItems.map((item) => (
									<a
										key={item.name}
										href={item.href}
										onClick={() => onClickMobileNavItem(item.href)}
										className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
										style={getNavItemStyle(item.href)}
									>
										{item.name}
									</a>
								))}
							</div>
						</div>
					</div>
				</DialogPanel>
			</Dialog>
		</header>
	)
}
