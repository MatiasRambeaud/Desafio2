const socket = io();

document.getElementById("form").addEventListener("submit", (event)=>{
    const formData = new FormData(event.target);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    })
    socket.emit("newProduct",data);
});

socket.addEventListener("log",()=>{
    window.location.reload();
})

const deleteButton = document.querySelectorAll('.deleteButton');
deleteButton.forEach(button => {
    button.addEventListener('click', function() {
        const id = parseInt(this.getAttribute('prodId'));
        socket.emit("delete",id);
    });
});
