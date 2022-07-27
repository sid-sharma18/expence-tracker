
const balance=document.getElementById('balance')
const money_plus=document.getElementById('money-plus')
const money_minus=document.getElementById('money-minus')
const list=document.getElementById('list')
const form=document.getElementById('form')
const text=document.getElementById('text')
const amount=document.getElementById('amount')
const addbtn=document.getElementById('btn')
let expencesobj=[];
showexpence()
addbtn.addEventListener('click',(e)=>{
    e.preventDefault();
   let expences=localStorage.getItem('expences')
   if(text.value=="" &&  amount.value=="")
   {
       alert('pleasse enter the valid values')
   }
   else{
    if(expences==null)
    {
        expencesobj= []
    }
    else{
        expencesobj=JSON.parse(expences)
    }
    let myobj={
        textval:text.value,
      amountval:amount.value
    }
    expencesobj.push(myobj)
    console.log(expencesobj)
    localStorage.setItem('expences',JSON.stringify(expencesobj))
    text.value=String("");
    amount.value=String("")
    console.log(expencesobj)
    updateExpence();
   showexpence()
}
})

function showexpence(){
    
    let expences=localStorage.getItem('expences')
    if(expences==null)
    {
        expencesobj=[]
    }
    else{
        expencesobj=JSON.parse(expences)
    }
   let html=""
   let amt=""
   
   expencesobj.forEach((element,index)=>{
       if(element.amountval<0){
       html+=`<li class="minus">${element.textval}
       <span>-₹${element.amountval}</span>
       <button class="delete-btn" id="${index}" onclick="deletenote(this.id)">x</button>
   </li>`
       }
       else{
       
            html+=`<li class="plus">${element.textval}
            <span>+₹${element.amountval}</span>
            <button class="delete-btn" id="${index}" onclick="deletenote(this.id)">x</button>
        </li>`
            
       }
   })
   if(expencesobj.length!=null){
       list.innerHTML=html;
   }
   else{
       list.innerHTML=`<h4>noitems added</h4>`
   }

 }
 
function deletenote(index){
    let expences=localStorage.getItem('expences')
    if(expences==null)
    {
        expencesobj=[]
    }
    else{
        expencesobj=JSON.parse(expences)
    }
    expencesobj.splice(index,1)
    localStorage.setItem('expences',JSON.stringify(expencesobj))
    showexpence();
    updateExpence()

}
updateExpence()

function updateExpence(){
    let exp=0;
    let inc=0;
    let expences=localStorage.getItem('expences')
    if(expences==null)
    {
        expencesobj=[]
    }
    else{
        expencesobj=JSON.parse(expences)
    }
    expencesobj.forEach((element)=>{
        if(element.amountval<0)
        {
            exp+=parseInt(element.amountval)
        }
        else{
            inc+=parseInt(element.amountval)
        }
    })
    money_plus.innerText=`+₹${inc}`
    money_minus.innerText=`-₹${exp}`
    let total=inc+exp
    updateTotal(total)
}
function updateTotal(total)
{
    if(total<0){
        balance.innerHTML=`₹${total}`
        balance.style.color="red"
    }
    else{
        balance.innerHTML=`₹${total}`
        balance.style.color="blue"
    }
}



