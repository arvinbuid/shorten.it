import { Link, useNavigate } from "react-router-dom";
import type { ShortenedUrlItem } from "../../hooks/useQuery";
import { FaExternalLinkAlt, FaRegCalendarAlt, } from "react-icons/fa";
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md'
import React, { useCallback, useEffect, useState } from "react";
import { useJwt } from "../../context/useJwtContext";

import dayjs from "dayjs";
import Graph from "./Graph";
import api from "../../api/api";
import Loader from "../Loader";

interface ShortenItemProps {
    item: ShortenedUrlItem;
}

const ShortenItem = ({ item }: ShortenItemProps) => {
    const { originalUrl, shortUrl, clickCount, createdDate } = item;
    const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN_URL.replace(/^https?:\/\//, "") // remove https://
    const navigate = useNavigate();

    const [analyticToggle, setAnalyticToggle] = useState(false);
    const [selectedUrl, setSelectedUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [analyticsData, setAnalyticsData] = useState([]);
    const { token } = useJwt();

    const analyticsHandler = (shortUrl: string) => {
        if (!analyticToggle) {
            setSelectedUrl(shortUrl)
        }
        setAnalyticToggle(!analyticToggle)
    }

    const fetchShortUrl = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await api.get(`/api/urls/analytics/${selectedUrl}?startDate=2025-01-01T00:00:00&endDate=2025-12-31T23:59:59`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setAnalyticsData(data);
            setSelectedUrl("");
            console.log(data)
        } catch (e) {
            navigate("/error")
            console.error(e);
        } finally {
            setLoading(false);
        }
    }, [navigate, selectedUrl, token])

    useEffect(() => {
        if (selectedUrl) {
            fetchShortUrl();
        }
    }, [selectedUrl, fetchShortUrl])

    return (
        <>
            <div className={`bg-slate-100 shadow-lg border border-dotted border-slate-500 px-6 py-3 sm:py-1 rounded-md transition-all duration-100 `}>
                <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-5 sm:gap-0 py-5">
                    <div className="flex-1 space-y-2 max-w-full overlow-x-auto overflow-y-hidden">
                        <div className="text-slate-900 pb-1 sm:pb-0 flex items-center gap-2">
                            <Link
                                target='_blank'
                                className='text-[16px]  font-raleway font-[600] text-linkColor'
                                to={`${import.meta.env.VITE_REACT_SUBDOMAIN_URL}/${shortUrl}`}
                            >
                                {subDomain + "/" + `${shortUrl}`}
                            </Link>
                            <FaExternalLinkAlt className="text-linkColor" />
                        </div>

                        {/* Short Url */}
                        <div className="flex items-center gap-1 ">
                            <h3 className=" text-slate-700 text-[12px] sm:text-sm font-raleway">
                                {originalUrl}
                            </h3>
                        </div>

                        {/* Click Count */}
                        <div className="flex items-center gap-8 pt-4">
                            <div className="flex gap-1  items-center font-semibold  text-green-800 font-raleway text-sm sm:text-[16px]">
                                <span>
                                    <MdOutlineAdsClick />
                                </span>
                                <span>{clickCount}</span>
                                <span>
                                    {clickCount === 0 || clickCount === 1 ? "Click" : "Clicks"}
                                </span>
                            </div>

                            {/* Created Date */}
                            <div className="flex items-center gap-2 font-raleway font-semibold text-sm sm:text-[16px] text-slate-800">
                                <span>
                                    <FaRegCalendarAlt />
                                </span>
                                <span>
                                    {dayjs(createdDate).format("MMM DD, YYYY")}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-1 items-center sm:justify-end gap-4">
                        {/* View Analytics */}
                        <div
                            onClick={() => analyticsHandler(shortUrl)}
                            className="flex cursor-pointer gap-1 items-center bg-rose-700 py-2 font-semibold shadow-md shadow-slate-500 px-6 rounded-md text-white text-sm "
                        >
                            <button>Analytics</button>
                            <MdAnalytics />
                        </div>
                    </div>
                </div>
                <React.Fragment>
                    <div className={`${analyticToggle ? "flex" : "hidden"} max-h-96 mt-4 sm:mt-0 relative min-h-96 border-slate-300 border-t w-full overflow-hidden`}>
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                {analyticsData.length === 0 && (
                                    <div className="absolute flex flex-col justify-center items-end sm:items-center w-full left-0 top-0 bottom-0 right-0 m-auto font-raleway">
                                        <h1 className=" text-slate-800 sm:text-2xl text-[15px] font-bold mb-1">
                                            No Data For This Time Period
                                        </h1>
                                        <h3 className="w-[90%] sm:w-96 sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-slate-600 ">
                                            Share your short link to view where your engagements are
                                            coming from
                                        </h3>
                                    </div>
                                )}
                                <Graph graphData={analyticsData} />
                            </>
                        )}
                    </div>
                </React.Fragment >
            </div >
        </>
    );
}

export default ShortenItem;