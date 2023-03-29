document.addEventListener("DOMContentLoaded", () => {
    const userName = Math.floor(Math.random() * 1000000);
    // Config for chat, created a chat class because I needed it for a number of different
    // user interfaces.  This is the config.
    const chatConfig = {
        eventTargetSelector: "#chat-form",
        eventType: "submit",
        preventDefault: true,
        getMessage: () => {
            const messageInput = document.getElementById("message");
            const message = messageInput.value;
            messageInput.value = "";
            return message;
        },
        sendRequest: async (message) => {
            const sessionUsername = `User ${userName}`;
            const response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=UTF-8",
                },
                body: JSON.stringify({ username: sessionUsername, message: message }),
            });
            return response;
        },
        createUserMessage: createUserMessage,
        createSystemMessage: createSystemMessage,
        updateLastMessage: updateLastMessage,
    };

    const chat = new Chat(chatConfig);
});

class Chat {
    constructor(config) {
        this.config = config;
        this.initChat();
    }

    initChat() {
        const eventTarget = document.querySelector(this.config.eventTargetSelector);

        eventTarget.addEventListener(this.config.eventType, async (e) => {
            if (this.config.preventDefault) {
                e.preventDefault();
            }

            const message = this.config.getMessage();

            // Display user's message immediately
            this.config.createUserMessage(message);

            const response = await this.config.sendRequest(message);

            // ... (Rest of the code for reading and displaying responses)
            const reader = response.body.getReader();
            const textDecoder = new TextDecoder("utf-8");

            // Display the assistant's response in chunks
            let assistantResponse = "";
            let lastChunkDisplayed = false;
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;

                assistantResponse += textDecoder.decode(value, { stream: !done });

                if (!lastChunkDisplayed) {
                    lastChunkDisplayed = true;
                    this.config.createSystemMessage(assistantResponse);
                } else {
                    this.config.updateLastMessage(assistantResponse);
                }
            }
        });
    }
}

function scrollToBottom() {
    const chatContent = document.getElementById("chat-content");
    chatContent.scrollTop = chatContent.scrollHeight;
}

async function createUsername() {
    const response = await fetch('/create_username', { method: 'POST' });
    return (await response).text();
    //return 1;
}

function updateLastMessage(content) {
    const chatContent = document.getElementById("chat-content");
    const lastMessage = chatContent.lastElementChild;
    lastMessage.querySelector(".content").textContent = content;
    scrollToBottom();
}

function createUserMessage(content) {
    createMessage("user", content);
}

function createSystemMessage(content) {
    createMessage("system", content);
}

function createMessage(role, content) {
    const messagesEl = document.getElementById("chat-content");
    const messageHtml = `
        <div class="d-flex flex-row justify-content-${role === "user" ? "end" : "start"} mb-4">
            <div 
                class="p-3 me-3 border ms-3"
                style="border-radius: 15px; 
                background-color: rgba(${role === "user" ? "57, 192, 237" : "229, 255, 0"}, 0.2);">
                <p class="mb-0 content">
                    ${content}
                </p>
            </div>
        </div>
    `;
    messagesEl.insertAdjacentHTML('beforeend', messageHtml);
    scrollToBottom();
}