import compare from "./compare"
import inputFun from "./inputFun"
/**
 * 開始時間と終了時間、useStateを入力するとuseStateを変えてくれるvoid関数。
 * @param {Date} start 始める時間 
 * @param {Date} end 終わり時間
 * @param {useState} set useState
 * @returns void関数
 */
export default function handleDate(start, end, set) { //? 시작-끝나는 시간 입력 todo
   const { setEndDate, setStartDate, setTodo, inputTodo } = set
   const { startDay, startHour, startMin } = start
   const { endDay, endHour, endMin } = end
   console.log("end 가 : ", end)
   let startResult = inputFun(startDay, startHour, startMin)
   let endResult = inputFun(endDay, endHour, endMin)
   console.log("Start : 는 ", startResult)
   console.log("end : 는 ", endResult)

   if (startResult === false || endResult === false) {
      return alert('잘못된 양식입니다 다시 입력해주세요')
   }

   let compared = compare(startResult, endResult)
   if (compared === false) {
      return alert('일정 시작 시간이 더 큽니다 다시 입력해주세요')
   }
   console.log("endResult : ", endResult)
   setEndDate(endResult)
   setStartDate(startResult)
   console.log(inputTodo)
   setTodo(inputTodo.current.value)
}
// ! CodeFlow => ユーザーが時間入力 => inputFunで検証 => 間違った場合handleDateでalert出力
// ! inputFunで間違ったものがない時、compare関数で有効性(時間)チェック => 間違った場合alert出力