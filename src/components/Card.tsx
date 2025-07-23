interface CardProps {
    title: string;
    description: string;
}

const Card = ({ title, description }: CardProps) => {
    return (
        <div className="flex flex-col px-6 py-8 gap-3 rounded-sm shadow-md shadow-slate-400 border border-slate-200">
            <h1 className="text-slate-900 text-xl font-bold ">{title}</h1>
            <p className="text-slate-700 text-sm"> {description}</p>
        </div>
    );
}

export default Card;