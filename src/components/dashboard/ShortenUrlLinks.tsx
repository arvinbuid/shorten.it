import type { TransformedShortenUrlData } from "../../hooks/useQuery";
import ShortenItem from "./ShortenItem";

interface ShortenUrlLinksProps {
    data: TransformedShortenUrlData
}

const ShortenUrlLinks = ({ data }: ShortenUrlLinksProps) => {
    return (
        <div className="my-6 space-y-4">
            {data.map((item) => (
                <ShortenItem key={item.id} item={item} />
            ))}
        </div>
    );
}

export default ShortenUrlLinks;