/* eslint-disable @typescript-eslint/no-explicit-any */
interface IProps {
    name?: string;
    stat1: any;
    stat2?: any;
    statName1: string | any;
    statName2?: string | any;
    measure1?: string | any;
    measure2?: string | any;
    icon?: JSX.Element;
}

const StatusCard = ({
    name,
    stat1,
    stat2,
    statName1,
    statName2,
    measure1,
    measure2,
    icon,
}: IProps) => {
    return (
        <div className="bg-white/30 backdrop-blur-xl inline-block rounded-lg p-3">
            <div className="flex">
                {icon}
                <h1 className="flex pl-2 md:pl-4 text-lg text-white font-bold">
                    {name}
                </h1>
            </div>
            <div className="md:pl-12 pl-10 pr-3">
                <h2 className="text-white flex">
                    {statName1}: {stat1}
                    {measure1}
                </h2>
                {stat2 !== undefined ? (
                    <h2 className="text-white flex">
                        {statName2}: {stat2}
                        {measure2}
                    </h2>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default StatusCard;
