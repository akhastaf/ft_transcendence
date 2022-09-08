document.addEventListener('load', () => {
    
})


$(document).ready(function() {
    const ioc = io('localhost:3000/room', {
        auth: {
            token: ''
        }
    });
    
    const btn_submit = $('#btn-submit');//document.querySelector('btn-submit');
    const textarea = $('#text');//document.querySelector('text');
    const ule = $('#msgs');//document.querySelector('msgs');
    btn_submit.submit((event) => {
        console.log(e);
        event.preventDefault();
        ioc.emit('sendMessage', { msg: textarea.value });
        textarea.value = '';
    })
    
    // addEventListener('click', (event) => {
    //     console.log(e);
    //     event.preventDefault();
    //     ioc.emit('sendMessage', { msg: textarea.value });
    //     textarea.value = '';
    // })
    ioc.on('recive-message', (args)=> {
        const lie = document.createElement('li');
        lie.innerText = args.msg;
        ule.appendChild(lie);
    })
   
})
