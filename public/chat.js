const socket = io();
// If server is located on another server use:
//const socket = io('https://<chat-server-addres>:3000');

const messages = document.getElementById('messages');
const msgForm = document.getElementById('input-form');
const msgInput = msgForm.getElementsByTagName('input')[0];
const joinForm = document.getElementById('join-form');
const usernameInput = joinForm.getElementsByTagName('input')[0];
const messagesContainer = document.getElementById('messages-container');
const chatContainer = document.getElementById('chat-section');



document.getElementById('chat').classList = 'hidden';
messagesContainer.classList.add(...'hidden flex-grow overflow-y-auto px-3 bg-black'.split(' '));
chatContainer.classList.add(...'flex flex-col justify-center items-center bg-black'.split(' '));

msgForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (msgInput.value) {
        socket.emit('chat message', msgInput.value);
        msgInput.value = '';
    }
});

joinForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (usernameInput.value) {
        socket.emit('join', usernameInput.value);
        usernameInput.value = '';
        document.getElementById('login').classList = 'hidden';
        document.getElementById('chat').classList = '';

        messagesContainer.classList.remove(...'hidden'.split(' '));
        chatContainer.classList.remove(...'justify-center items-center'.split(' '));

        msgInput.focus();
    }
});

socket.on('chat message', (msg) => {
    const item = document.createElement('li');
    if (msg.startsWith('You:')) {
        item.textContent = msg;
        item.classList.add(...'text-white bg-orange-600 m-5 w-fit rounded-xl p-2'.split(' '));
    } else {
        item.textContent = msg;
        item.classList.add(...'text-left text-white bg-orange-300 m-5 w-fit rounded-xl p-2 ml-52'.split(' '));

    }
    item.classList.add
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});
