import { useState } from "react";
import { useJwt } from "../../context/useJwtContext";
import { useFetchShortenUrls, useFetchTotalClicks } from "../../hooks/useQuery";
import Graph from "./Graph";
import ShortenUrlPopup from "./ShortenUrlPopup";

const DashboardLayout = () => {
    const { token } = useJwt();
    const [shortenUrlPopup, setShortenUrlPopup] = useState(false);
    const { isLoading, data: totalClicks } = useFetchTotalClicks(token);
    const { isLoading: shortenUrlsLoading, data: shortenUrls, refetch } = useFetchShortenUrls(token);

    if (isLoading) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <p>Loading graph data...</p>
            </div>
        );
    }

    if (!totalClicks) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
                <p>No graph data found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-64px)] px-4 sm:px-8 lg:px-14 py-6">
            <div className="w-full lg:w-[90%] mx-auto py-16">
                <h1 className="text-center text-lg md:text-2xl lg:text-3xl mb-8 font-semibold">Total Clicks and Number of Clicks Graph</h1>
                <div className="h-96 relative">
                    {totalClicks.length === 0 && (
                        <div className="absolute flex flex-col justify-center items-end sm:items-center w-full left-0 top-0 bottom-0 right-0 m-auto">
                            <h1 className=" text-slate-800 text-[18px] sm:text-2xl font-bold mb-1">
                                No Data For This Time Period.
                            </h1>
                            <h3 className="w-[90%] sm:w-96 pl-6 text-center text-sm sm:text-md ml-0 text-slate-600">
                                Share your short link to view where your engagements are
                                coming from!
                            </h3>
                        </div>
                    )}
                    <Graph graphData={totalClicks} />
                </div>
                {/* Create New URL Button */}
                <div className="text-[12px] text-center sm:text-end py-6">
                    <button
                        onClick={() => setShortenUrlPopup(true)}
                        className="bg-custom-gradient text-white rounded-md py-2 px-4">Create new Short URL</button>
                </div>
            </div>

            <ShortenUrlPopup
                open={shortenUrlPopup}
                setOpen={setShortenUrlPopup}
                refetch={refetch}
            />
        </div>
    );
}

export default DashboardLayout;