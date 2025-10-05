const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
var x = 0;
var y = 0;
var drawing = false;
var state = "draw";

function draw(event){
    if (drawing && state == "draw"){
        var mouseX = event.clientX - canvas.offsetLeft;
        var mouseY = event.clientY - canvas.offsetTop;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(mouseX, mouseY);
        x = mouseX;
        y = mouseY;
        ctx.lineWidth = 3;
        ctx.strokeStyle = document.getElementById("colorPicker").value;
        ctx.stroke();
    }else if (drawing && state == "erase"){
        var mouseX = event.clientX - canvas.offsetLeft;
        var mouseY = event.clientY - canvas.offsetTop;
        ctx.clearRect(mouseX-5, mouseY-5, 10, 10);
    }
}
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', function(event){
    drawing = false;
});
canvas.addEventListener('mousedown', function(event){
    x = event.clientX - canvas.offsetLeft;
    y = event.clientY - canvas.offsetTop;
    drawing = true;
});
canvas.addEventListener('mouseleave', function(event){
    drawing = false;
});

document.addEventListener('click', function(event){
    console.log(event.target.id);
    if (event.target.id == "eraser"){
        if (state == "draw"){
            state = "erase";
        }else{
            state = "draw";
        }
    }else if (event.target.id == "clear"){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }else if (event.target.id == "submitbutton"){
        state = "draw";
    }
});