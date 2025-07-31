import { Link } from "react-router-dom";
import type { ShortenedUrlItem } from "../../hooks/useQuery";
import { FaExternalLinkAlt, FaRegCalendarAlt, } from "react-icons/fa";
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md'

import dayjs from "dayjs";

interface ShortenItemProps {
    item: ShortenedUrlItem;
}

const ShortenItem = ({ item }: ShortenItemProps) => {
    const { originalUrl, shortUrl, clickCount, createdDate } = item;
    const subDomain = import.meta.env.VITE_REACT_SUBDOMAIN_URL.replace(/^https?:\/\//, "") // remove https://

    const analyticsHandler = (shortUrl: string) => { }

    return (
        <div className={`bg-slate-100 shadow-lg border border-dotted border-slate-500 px-6 py-3 sm:py-1 rounded-md transition-all duration-100 `}>
            <div className="flex flex-col sm:flex-row w-full sm:justify-between gap-5 sm:gap-0 py-5">
                <div className="flex-1 space-y-2 max-w-full overlow-x-auto overflow-y-hidden">
                    <div className="text-slate-900 pb-1 sm:pb-0 flex items-center gap-2">
                        <Link
                            target='_blank'
                            className='text-[16px]  font-raleway font-[600] text-linkColor'
                            to={import.meta.env.VITE_REACT_SUBDOMAIN_URL + "/s/" + `${shortUrl}`}
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
        </div>
    );
}

export default ShortenItem;