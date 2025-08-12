const curreny_one = document.getElementById("currency-one");
const curreny_two = document.getElementById("currency-two");
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");
const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

//API link  https://open.exchangerate-api.com/v6/latest
function calculate(){
  const currenyE1_one=curreny_one.value;
  const currenyE1_two=curreny_two.value;
  fetch("https://open.exchangerate-api.com/v6/latest")
  .then(res => res.json())
  .then(data=>{
    const rate = data.rates[currenyE1_two]/data.rates[currenyE1_one];
    rateEl.innerText=`1$[currenyE1_one]=${rate}${currenyE1_two}`;
    amount_two.value=(amount_one.value*rate).toFixed(2);
  })
    
}
curreny_one.addEventListener('change',calculate);
amount_one.addEventListener('input',calculate);
curreny_two.addEventListener('change',calculate);
amount_two.addEventListener('input',calculate);

swap.addEventListener('click', () =>{
const temp = curreny_one.value;
curreny_one.value=curreny_two.value;
curreny_two.value=temp;
calculate();
})
