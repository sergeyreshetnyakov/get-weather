/* eslint-disable @typescript-eslint/no-explicit-any */
interface IProps {
    name: string
    stat1: any
    stat2: any
    statName1: string
    statName2: string
}

const StatusCard = ({name, stat1, stat2, statName1, statName2}: IProps) => {
    return (
        <div>
            <h1>{name}</h1>
            <div>
                <h2>{statName1}: {stat1}</h2>
                <h2>{statName2}: {stat2}</h2>                
            </div>
        </div>
)}

export default StatusCard