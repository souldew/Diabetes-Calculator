import MyTable from "../components/table";

const lunchContents = [
  {
    date: "2024/04/01",
    eat: "ラーメン",
    dayOfHour: "12:00",
  },
  {
    date: "2024/04/02",
    eat: "hoge",
    dayOfHour: "12:10",
  },
];

const hoge: string = "3";

export default function Lunch() {
  return (
    <>
      <MyTable foo={lunchContents} hoge={hoge} />
    </>
  );
}
