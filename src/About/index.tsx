const About = () => {
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
            <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                <div className="text-center">
                    <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
                        Zachary Bensley
                    </h1>
                    <h3 className="text-2xl font-semibold tracking-tight text-balance text-gray-700 sm:text-4xl">
                        Software Engineer
                    </h3>
                    <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                        I am a Software Engineer who is currently working in the Washington DC Metro Area.
                        I love writing code, making maps, and data visualization.
                        Most of my personal projects try to incorporate these interests.
                        I am currently working as a Senior Software Engineer at Qualtrics on the reporting applications team where I solve complex data visualization and scale problems.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
