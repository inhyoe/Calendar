
/**
    * @param {string} SD 날자
    * @param {string} SH 시간
    * @param {string} SM 분
    * @return {boolean or string(time)} 유저가 입력한 시간을 리턴 혹은 false
*/
export default function inputFun(SD, SH, SM) {

   if (SD !== undefined) {
      let sd = SD.current.value // * 날자
      let sh = SH.current.value // * 시간
      let sm = SM.current.value // * 분
      if (sd == NaN || sh == NaN || sm === NaN) {
         SH.current.value = ''
         SM.current.value = ''
         return false
      } else if (sh > 24 || sm > 60) { // ? 시간이 범위를 벗어났을때 날짜는 정규 표현식을 배우고 할 것.
         SH.current.value = ''
         SM.current.value = ''
         return false
      }
      let sDsHsM = sd.concat(`/${sh}/`).concat(sm)
      return sDsHsM
   }
   // 유저가 입력한 시간을 리턴해주는 함수
}


