/* eslint-disable @typescript-eslint/no-explicit-any */
interface IProps {
    date: string
    weekday: string
    handlePrevious: any
    handleNext: any
}

const Date = ({date, weekday, handlePrevious, handleNext}: IProps) => {
    return(
        <div className="flex justify-center w-screen">
            <button onClick={() => handlePrevious}>previous</button>
            <div>
            <h1>{date}</h1>
            <h3>{weekday}</h3>
            </div>
            <button onClick={() => handleNext()}>next</button>
        </div>
    )
}

export default Date