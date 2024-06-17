// const formResumeData = (data) => {

//     let list = [
//         `${data.name} ${data.surname}`, 
//         data.email, 
//         `${data.specialization}${data.qualification.length?' - '+data.qualification:''}`,
//         `Опыт работы: ${data.experience} ${getYearWord(data.experience)}`,

//     ]
// }

// const getYearWord = (age) => {
//     const lastDigit = age % 10;
//     const lastTwoDigits = age % 100;
  
//     if (lastDigit === 1 && lastTwoDigits !== 11) {
//       return 'год';
//     } else if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
//       return 'года';
//     } else {
//       return 'лет';
//     }
//   }
