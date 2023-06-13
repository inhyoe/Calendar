/**
   * 시작 시간과 끝 시간을 비교해주는 함수
   * @param {String} before 시작시간
   * @param {String} after  끝나는시간
   * @return {Boolean} true 혹은 false를 반환함
   */
export default function compare(before, after) {
   console.log(before, "After :", after);
   let startArr = before.split('/')
   let endArr = after.split('/')
   if (startArr[3] > endArr[3]) { // * startArr[3] 은 시간
      return false
   } else if (startArr[3] === endArr[3]) {
      if (startArr[4] > endArr[4]) // * startArr[4] 는 분
         return false
   }
}