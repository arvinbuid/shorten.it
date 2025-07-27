import { dummyData } from "../../data/dummyData";
import Graph from "./Graph";

const DashboardLayout = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] px-4 sm:px-8 lg:px-14 py-6">
            <div className="w-full lg:w-[90%] mx-auto py-16">
                <h1 className="text-center text-lg md:text-2xl lg:text-3xl mb-8 font-semibold">Total Clicks and Number of Clicks Graph</h1>
                <div className="h-96 relative">
                    <Graph graphData={dummyData} />
                </div>
                {/* Create New URL Button */}
                <div className="text-[12px] text-center sm:text-end py-6">
                    <button className="bg-custom-gradient text-white rounded-md py-2 px-4">Create new Short URL</button>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;