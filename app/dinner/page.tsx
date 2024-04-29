import MyTable from "../components/table";

const dinnerContents = [
    {
        date: "2024/04/01",
        eat: "パン",
        dayOfHour: "13:00"
    }
];

export default function Dinner() {
    return (
        <>
            <MyTable 
                data={dinnerContents}
            />
        </>
    )
}
