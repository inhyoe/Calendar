




/**
  * 이메일 체크 유효성 체크
  * @param {String} email 이메일 체크하기 
  * @returns Boolean
  */
 function checkEmail(email){
   if(!/^[a-zA-Z0-9._-]{1,}@[0-9a-zA-Z-]{3,}([.][a-zA-Z]{2,3}){1,2}$/.test(email)) 
     return false;
 }

 /**
  * 패스워드 유효성 체크
  * @param {string} passwd
  * @returns boolean
  */
 function checkPw(passwd){
   if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(passwd)){
     return false
   }
 }

 /**
  * 패스워드 일치 여부 확인
  * @param {String} passwd 
  * @param {String} passwdCk 
  * @returns boolean
  */
 function checkPwCorrect(passwd, passwdCk){
   if(passwd !== passwdCk){
     return false
   }
 }
 /**
  * 전화번호 유효성 체크
  * @param {*} tel 
  * @returns boolean
  */
 function telCheck(tel){
   console.log(typeof(Number(tel)));
   
   if(!/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/.test(Number(tel))){
     return false
   }
 }
 
 export {checkEmail , checkPw , checkPwCorrect, telCheck }