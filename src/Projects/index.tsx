import React from "react"
import Project, { ProjectProps } from './Project';
import { CodeBracketIcon } from '@heroicons/react/24/outline'
import mapRoomBackground from './images/MapRoomBackground.png'
import forgetMeKnot from './images/ForgetMeKnot.png'
import horseRunner from './images/HorseRunner.png'
import rummyCumulativeWinner from './images/RummyCumulativeWinner.png'
import williamShakespurr from './images/WilliamShakespurr.jpg'
import zombieEscape from './images/ZombieEscape.png'

const codeBracketIcon = <CodeBracketIcon className="size-6" />

const projects: ProjectProps[] = [
	{
		title: 'MapTogether',
		description: 'A GIS Web application written in Django. Users can create maps and save point, line, and polygon data. All changes to the map are synchronized across all web page viewers in real-time.',
		image: {
			src: mapRoomBackground,
			alt: 'Map Together Background Image'
		},
		projectIcons: [
			{
				icon: codeBracketIcon,
				url: 'https://github.com/Zacharilius/map_together'
			}
		]
	},
	{
		title: 'Horse Runner',
		description: 'A side-scroller game written in TS where you canter, gallop, & jump over barriers. I created this game with my daughter :)',
		image: {
			src: horseRunner,
			alt: 'Horse Runner Image'
		},
		projectIcons: [
			{
				icon: codeBracketIcon,
				url: 'https://github.com/Zacharilius/horse-runner'
			}
		]
	},
	{
		title: 'Zombie Escape',
		description: 'A silly, top down game written in Python and PyGame that you play as a zombie who tries to eat as many brains as possible before one of Van Helsing daughters finds and kills you.',
		image: {
			src: zombieEscape,
			alt: 'Picture of Zombie Escape Game'
		},
		projectIcons: [
			{
				icon: codeBracketIcon,
				url: 'https://github.com/Zacharilius/zombie_escape'
			}
		]
	},
	{
		title: 'Forget-me-knot',
		description: 'Forget-Me-Knot is a RESTful MEAN Stack web application. Users can create reminders and then Forget-Me-Knot notifies user by their preferred message type either email or SMS.',
		image: {
			src: forgetMeKnot,
			alt: 'Screenshot of Forget-me-knot app'
		},
		projectIcons: [
			{
				icon: codeBracketIcon,
				url: 'https://github.com/Zacharilius/forget-me-knot'
			}
		]
	},
	{
		title: 'Shakespurrian Bot',
		description: 'An X (twitter) bot written in Python that posts a Shakespeare quote that was translated from English into Cat. Special thanks to http://kittify.herokuapp.com/ for the English to Cat translations.',
		image: {
			src: williamShakespurr,
			alt: 'Picture of William Shakespurr'
		},
		projectIcons: [
			{
				icon: codeBracketIcon,
				url: 'https://github.com/Zacharilius/shakespurrean-twitter-bot'
			}
		]
	},
	{
		title: 'Rummy Cumulative Winner',
		description: 'My wife and I have been playing the same game of Rummy since January 2017. I thought it would be fun to create some summary statistics and charts to track the winner.',
		image: {
			src: rummyCumulativeWinner,
			alt: 'Screenshot of Line chart showing cumulative winner'
		},
		projectIcons: [
			{
				icon: codeBracketIcon,
				url: 'https://github.com/Zacharilius/zacharilius.github.io/blob/rummy-data-vis/static/js/rummy.js'
			}
		]
	}
];

export default function Projects() {
	return (
		<div className="container mx-auto p-4 bg-gray-100"> {/* Added background to the container */}
			<h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Projects</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Increased gap */}
				{projects.map((project) => (
					<Project key={project.title} {...project} />
				))}
			</div>
		</div>
	)
}
