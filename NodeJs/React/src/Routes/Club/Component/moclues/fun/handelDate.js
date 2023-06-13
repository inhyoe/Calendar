import compare from "./compare"
import inputFun from "./inputFun"

export default function handleDate(start, end, set) { //? 시작-끝나는 시간 입력 todo
   const { setEndDate, setStartDate, setTodo, inputTodo } = set
   const { startDay, startHour, startMin } = start
   const { endDay, endHour, endMin } = end
   console.log("end 가 : ", end)
   let startResult = inputFun(startDay, startHour, startMin)
   let endResult = inputFun(endDay, endHour, endMin)
   console.log("Start : 는 ", startResult)
   console.log("end : 는 ", endResult)

   if (startResult == false || endResult === false) {
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
// ! CodeFlow => 유저가 시간 입력 => inputFun에서 유효성 검사 =>잘못된 경우 handleDate에서 alert출력
// ! inputFun에서 잘못된 것이 없을때 compare 함수에서 유효성(시간) 검사 => 잘못된 경우 alert출력