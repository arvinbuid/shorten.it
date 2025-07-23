import Card from "./Card";

const cardsData = [
    {
        title: "Simple URL Shortening",
        description: 'Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle.'
    },
    {
        title: "Powerful Analytics",
        description: 'Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies.'
    },
    {
        title: "Enhanced Security",
        description: 'Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure.'
    },
    {
        title: "Fast and Reliable",
        description: 'Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users.'
    },
]

const LandingPage = () => {
    return (
        <div className="min-h-[calc(100vh-64px)] max-w-[calc(100vw-32px)] px-4 sm:px-8 lg:px-14 mx-auto">
            <div className="flex-col lg:flex-row py-0 lg:py-5 pt-4 md:pt-16 gap-8 lg:gap-10 flex justify-between items-center mt-12 mb-24">
                <div className="flex-none w-full lg:flex-1 ml-0 xl:ml-12">
                    <h1 className="font-bold text-slate-800 text-3xl sm:text:4xl md:text-5xl leading sm:leading-[40px] md:leading-[55px] md:w-3/4 lg:w-full">
                        Shorten.io Simplifies URL Shortening For Efficient Sharing.
                    </h1>
                    <p className="text-slate-700 text-sm my-6">
                        Shorten.io streamlines the process of URL shortening, making sharing
                        links effortless and efficient. With its user-friendly interface,
                        Shorten.io allows you to generate concise, easy-to-share URLs in
                        seconds. Simplify your sharing experience with Shorten.io today.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 md:pt-0">
                        <button className="w-full sm:w-40 text-navbarColor rounded-md bg-custom-gradient py-2">Manage Links</button>
                        <button className="w-full sm:w-40 border border-btnColor text-btnColor rounded-md py-2">Create Short Link</button>
                    </div>
                </div>
                {/* Landing Page Image */}
                <div className="flex-1 flex justify-center w-full">
                    <img
                        className="w-[400px] sm:w-[500px] lg:w-[625px] object-cover rounded-md"
                        src="/images/share-link.png"
                        alt=""
                    />
                </div>
            </div>

            <div className="pt-7 sm:pt-12 max-w-[1400px] mx-auto">
                <p className="text-slate-800 font-roboto font-bold w-full sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto text-2xl sm:text-3xl text-center">
                    Trusted by individuals and teams at the world best companies{" "}
                </p>
                {/* Cards */}
                <div className="pt-2 pb-7 grid gap-4 lg:gap-7 xl:grid-cols-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-10">
                    {cardsData.map((card, index) => (
                        <Card key={index} title={card.title} description={card.description} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;