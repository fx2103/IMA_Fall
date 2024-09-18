console.log('hello');

//steps
//1.identify and select the button
let button;
button = document.getElementById('button');
console.log(button);

//2.listen to event click on the button
button.addEventListener("click", changePic);

//3.change the pic on the page
function changePic(){
    console.log("change the pic");
    const image = document.getElementById('image');
    image.src = 'Notebook.png';
}