import Background from "./components/Background";
import Header from "./components/Header";
export default function Home() {
    return (
        <div className="relative h-screen w-screen overflow-hidden bg-background justify-items-center">
            <Header stay={false} />


            <Background>
                <div className="flex flex-col items-center text-center gap-10">

                    <h1 className="text-white text-4xl md:text-5xl font-medium tracking-wide font-sofia">
                        Newsletters brought to you by the student of ANTS
                    </h1>

                    <p className="text-white/80 text-lg font-league">
                        Share your experiences which we missed
                    </p>

                    <div className="flex gap-6 pt-4">
                        <button className="px-8 py-3 rounded-xl bg-black/30 text-white/70 text-sm backdrop-blur-xl drop-shadow-2xl drop-shadow-gray-900 transition-transform duration-700 hover:-translate-y-1.5">
                            Recent story
                        </button>

                        <button className="px-8 py-3 rounded-xl bg-black/30 text-white/70 text-sm backdrop-blur-xl drop-shadow-2xl drop-shadow-gray-900 transition-transform duration-700 hover:-translate-y-1.5">
                            Share
                        </button>
                    </div>

                </div>
            </Background>
        </div>
    );
}
