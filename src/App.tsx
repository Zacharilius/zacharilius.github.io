import React, { useState } from 'react'
import './App.css';
import About from './About';
import Nav from './Nav';
import Projects from './Projects';
import Resume from './Resume';

export interface NavigationItem {
    name: string;
    href: string;
    // TODO: Find better type
    component: React.ReactElement;
}

const navigationItems: NavigationItem[] = [
  { name: 'About', href: '#about', component: <About/>},
  { name: 'Projects', href: '#projects', component: <Projects/> },
  { name: 'Resume', href: '#resume', component: <Resume/> },
];

const App = () => {
    const [navHref, setNavHref] = useState(getActiveNavItem(window.location.hash).href);

    function getActiveNavItem (navHref: string): NavigationItem {
        const navItem = navigationItems.find((navigationItem) => navigationItem.href === navHref);
        return navItem ?? navigationItems[0];
    }

    const getActiveComponent = (navHref: string): React.ReactElement => {
        return getActiveNavItem(navHref)?.component
    }

    return (
        <div className="bg-white">
            <Nav
                navigationItems={navigationItems}
                setNavHref={setNavHref}
            />
            {/* <div>
            {
                navigationItems.map(navigationItem => {
                    return navigationItem.component
                })
            }
            </div> */}
            { getActiveComponent(navHref) }
        </div>
    );
};

export default App;
