import { calculateDiscount } from './calculations.mjs';

const form = document.querySelector('#discount-form');
const price = document.querySelector('#price');
const discount = document.querySelector('#discount');
const money = value => new Intl.NumberFormat('en-IN', {style:'currency',currency:'INR',minimumFractionDigits:2,maximumFractionDigits:2}).format(value);
const setText = (id, text) => { document.getElementById(id).textContent = text; };
function clearErrors(){ for(const field of [price,discount]) { field.removeAttribute('aria-invalid'); setText(`${field.id}-error`,''); } }
function syncPicks(){document.querySelectorAll('[data-discount]').forEach(button=>button.setAttribute('aria-pressed',String(discount.value !== '' && Number(button.dataset.discount) === Number(discount.value))));}
function calculate(){
 clearErrors(); let firstInvalid;
 const result = calculateDiscount(price.value, discount.value);
 for (const field of [price, discount]) {
  if (result.errors[field.id]) {
   field.setAttribute('aria-invalid', 'true');
   setText(`${field.id}-error`, result.errors[field.id]);
   firstInvalid ??= field;
  }
 }
 if(firstInvalid){setText('result-help','Previous result shown, if available. Correct the highlighted input and calculate again.');firstInvalid.focus();return;}
 const { original, percent, saved } = result;
 setText('final-price',money(original-saved));setText('result-help','The price after your discount. Nice and simple.');setText('original-result',money(original));setText('discount-label',`(${percent}%)`);setText('savings-result',`− ${money(saved)}`);setText('savings-message',`You save ${money(saved)}. That’s ${percent}% less.`);syncPicks();
}
form.addEventListener('submit',event=>{event.preventDefault();calculate();});
form.addEventListener('reset',()=>{clearErrors();setText('final-price','₹—');setText('result-help','A good deal starts with the numbers.');setText('original-result','—');setText('discount-label','');setText('savings-result','—');setText('savings-message','Your savings will appear here');document.querySelectorAll('[data-discount]').forEach(button=>button.setAttribute('aria-pressed','false'));});
discount.addEventListener('input',syncPicks);
document.querySelectorAll('[data-discount]').forEach(button=>{button.setAttribute('aria-pressed','false');button.addEventListener('click',()=>{discount.value=button.dataset.discount;syncPicks();});});
document.querySelector('#example').addEventListener('click',()=>{price.value='2500';discount.value='20';calculate();document.querySelector('#calculator').scrollIntoView({block:'start'});});
