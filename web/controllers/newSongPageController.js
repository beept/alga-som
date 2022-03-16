const frm = document.querySelector('form');


function dataIsValid(data)
{
  
  return true;
}

frm.addEventListener('submit', () => {
  event.preventDefault();
  
  let formData = new FormData(frm);
  
  for (let pair of formData.entries()) {
    console.log(`${pair[0]} - ${pair[1]} - ${typeof pair[1]}`);
  }
  
  
  
  
});