import Board from "./board";

export interface Record {
  name: string,
  time: number
}

const records = [{name: 'Трус', time: 100}, {name: 'Балбес', time: 200}, {name: 'Бывалый', time: 300}];

export default function Leaderboard() {
  return (
    <Board {...{records}} />
  )
}