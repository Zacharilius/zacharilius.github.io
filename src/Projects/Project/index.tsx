import React from "react"

export interface ProjectProps {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
  projectIcons: ProjectIcon[];
}

interface ProjectIcon {
  icon: React.ReactNode;
  url: string;
}

export default function ProjectCard({ ...project }: ProjectProps ) {
	return (
		<div className="bg-white rounded-lg shadow-md p-6 transition duration-300 hover:scale-105"> {/* Added hover effect */}
			<img
				src={project.image.src}
				alt={project.image.alt}
				className="w-full h-48 object-cove
        r rounded-md mb-4"
			/>
			<h3 className="text-xl font-semibold mb-2 text-gray-800">{project.title}</h3>
			<p className="text-gray-700 mb-4">{project.description}</p>
			<div className="flex items-center">
				{project.projectIcons.map((icon, index) => (
					<a
						key={index}
						href={icon.url}
						target="_blank"
						rel="noopener noreferrer"
						className="text-gray-500 hover:text-gray-700 mr-2"
					>
						{icon.icon}
					</a>
				))}
			</div>
		</div>
	);
}
