const form = document.querySelector(".quiz-form");
const questions =  document.querySelectorAll(".question");
const result = document.querySelector(".result");
const correctAnswers = ['D','B','C','B','D'];

form.addEventListener('submit', (e) => {
   let score=0;
   e.preventDefault();
   userAnswers=[
       form.q1.value,
       form.q2.value,
       form.q3.value,
       form.q4.value,
       form.q5.value,
   ];
   console.log(userAnswers)
   userAnswers.forEach((ans,index)=>{
       if(answer===correctAnswers[index]){
           questions[index].classList.add('correct-answer');
       }
       else {
           questions[index].classList.add('wrong-answer');
       }
   });
   result.classList.remove('hide');
   result.firstChild.textContent=`your score ${score}`
});