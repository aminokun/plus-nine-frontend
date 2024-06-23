import ReactPlayer from 'react-player/lazy'

const Home = () => {
    return (
        <div className="flex flex-col items-center mt-6 lg:mt-20">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
                Improve your
                <span className="bg-gradient-to-r from-blue-500 to-purple-800 text-transparent bg-clip-text">
                    {" "}
                    habits
                </span>
            </h1>
            <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
                "In the face of overwhelming odds, it is the determination to rise, alone if necessary, that transforms the ordinary into the extraordinary."
            </p>
            <div className="flex justify-center my-10">
                <a
                    href="/login"
                    className="py-3 px-4 mx-3 rounded-md border"
                >
                    Start for free
                </a>
                <a
                    href="/premium"
                    className="bg-gradient-to-r from-blue-500 to-blue-800 py-3 px-4 mx-3 rounded-md"
                >
                    Get premium
                </a>
            </div>
            <div className="flex sm:flex-row mt-4 2xs:flex-col border-2 sm:items-start 2xs:items-center justify-center">
                <ReactPlayer
                    loop={true}
                    controls={false}
                    playing={true}
                    muted={true}
                    width={1080}
                    height={610}
                    url='../src/assets/video1.mp4'
                />
            </div>
        </div>
    );
};

export default Home