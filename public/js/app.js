


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');
const image = document.querySelector('img');



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const locationx = search.value;
    message.textContent='Loading...';
    message2.textContent='';
    image.src = '';
image.style.display='none';
    fetch('http://localhost:3000/weather?address='+locationx).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            message.textContent = data.error;
        } else{
            message.textContent = data.location;
            message2.textContent = data.forecast.summary;
            image.src = 'https://darksky.net/images/weather-icons/'+data.forecast.icon+'.png';
            image.style.display='inline';

        }
        
    })
    })

})





