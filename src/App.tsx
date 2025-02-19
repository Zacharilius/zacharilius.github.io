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
    const [navHref, setNavHref] = useState(navigationItems[0].href);

    const getActiveComponent = (navHref: string): any => {
        return navigationItems.find((navigationItem) => navigationItem.href === navHref)?.component
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
