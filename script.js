const balance = document.getElementById('balance');
const incomes = document.getElementById('money-plus');
const expens = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const dummyData = [
  {id:1 , text:'tea', amount :30},
  {id:2 , text:'water', amount :90},
  {id:3 , text:'burger', amount :100},
  {id:4 , text:'coffe', amount :120}
 ]

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

function generateId(){
 return Math.floor(Math.random()*10000000) 
}


function addTransaction(e){
 e.preventDefault();
 if (text.value.trim()===''|| amount.value.trim()==='') {
   alert('please add a text and an amount');
 }
 else{
   const transaction = {
     id: generateId(),
     text: text.value,
     amount:+amount.value
   }
   transactions.push(transaction);
   addTransactionDOM(transaction);
   updatevalues();
   updateLocalStorage();
   text.value='';
   amount.value='';
 }
};


function addTransactionDOM(transaction){
const sign = transaction.amount<0?'-':'+';
const item=document.createElement('li');
item.classList.add(transaction.amount<0?'minus':'plus');
item.innerHTML=`${transaction.text}<span>${sign} ${Math.abs(transaction.amount)}</span> <button class="delete-btn" onClick="removeTransaction(${transaction.id})"> x </button>`
list.appendChild(item);

}

function updatevalues(){
  const amounts = transactions.map(
    transction =>transction.amount
  );
  const total = amounts.reduce((acc,item)=>(acc+=item),0).toFixed(2)
  const income = amounts.filter(item =>item>0)
  .reduce((acc,item)=>(acc+=item),0).toFixed(2);
  const exp = amounts.filter(item=>item<0).filter(item =>item>0)
  .reduce((acc,item)=>(acc+=item),0)*-1
  .toFixed(2);
  
  balance.innerText=`$${total}`;
  income.innerText=`$${income}`;
  expens.innerText=`$${exp}`;
}

function updateLocalStorage(){
  localStorage.setItem('transactions',JSON.stringify(transactions));
}

function removeTransaction(id){
  transactions=transactions.filter(money=>money.id!==id);
  updateLocalStorage();
  init();
}

function init(){
list.innerHTML='';
transactions.forEach(addTransactionDOM);
updatevalues();
}
init();
form.addEventListener('submit',addTransaction)