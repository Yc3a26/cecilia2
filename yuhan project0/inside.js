const toothbrush = document.getElementById('full-toothbrush');
const head = document.getElementById('head');

head.addEventListener('click', () => {
    toothbrush.classList.toggle('apart');

document.getElementById('brushhead-info').hidden =
    !toothbrush.classList.contains('apart');
});
const bristles = document.getElementById('bristles');
bristles.addEventListener('click', () => {
    bristles.classList.toggle('apart');
    document.getElementById('bristles-info').hidden =
        !bristles.classList.contains('apart');
});
const casing = document.getElementById('casing');
const info = document.getElementById('casing-info')
let count = 0;
casing.addEventListener('click', () => {
    count = count + 1;
   if (count === 1) {
    casing .classList.add('apart');
    info.hidden = false;
   } else if (count === 2) {
    info.hidden = true;
   } else {
    casing.classList.remove('apart');
    info.hidden = true;
    count = 0;
   }
});
const motor = document.getElementById('motor');
motor.addEventListener('click', () => {
    motor.classList.toggle('apart');
    document.getElementById('motor-info').hidden =
        !motor.classList.contains('apart');
});
const battery = document.getElementById('battery');
battery.addEventListener('click', () => {
    battery.classList.toggle('apart');
    document.getElementById('battery-info').hidden =
        !battery.classList.contains('apart');
});
const openall = document.getElementById ('open-all');
openall.addEventListener('click', () => {
    toothbrush.classList.add('apart');
    casing.classList.add('apart');
    motor.classList.add('apart');
    battery.classList.add('apart');
    bristles.classList.add('apart');
});
const askAI = document.getElementById('ask-ai');
const aiAnswer =document.getElementById('AI-answer');
askAI.addEventListener('click', async () => {
    aiAnswer.textContent = 'Thinking...';

try  {
    const response = await fetch('/api/claude', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({
    prompt:'what other home appliances use electric motor? Give three example.'
   })
});
const data = await response.json();
aiAnswer.textContent = data.text || data.error;
} catch (error) {
    aiAnswer.textContent = 'Error: ' + error.message;
}
});