<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ask Aunt Kate - Your Healthcare Advocate</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #3B82F6;
            --secondary: #1E40AF;
            --accent: #60A5FA;
            --dark: #1F2937;
            --gray: #6B7280;
            --light-gray: #F3F4F6;
            --light: #F9FAFB;
            --white: #FFFFFF;
            --success: #10B981;
            --warning: #F59E0B;
            --danger: #EF4444;
            --gradient: linear-gradient(135deg, var(--primary), var(--accent));
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--light);
            color: var(--dark);
            line-height: 1.6;
            height: 100vh;
            overflow: hidden;
        }

        /* Header */
        .header {
            background: var(--white);
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            z-index: 1000;
            position: relative;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 800;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .logo::before {
            content: '🩺';
            font-size: 1.5rem;
        }

        .header-actions {
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        .btn {
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
        }

        .btn-primary {
            background: var(--gradient);
            color: white;
        }

        .btn-secondary {
            background: var(--white);
            color: var(--primary);
            border: 2px solid var(--primary);
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .status-indicator {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            color: var(--gray);
        }

        .status-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--success);
            animation: pulse 2s infinite;
        }

        .status-dot.offline {
            background: var(--danger);
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
        }

        /* Chat Container */
        .chat-container {
            display: flex;
            height: calc(100vh - 80px);
            background: var(--white);
        }

        /* Sidebar */
        .sidebar {
            width: 300px;
            background: var(--light);
            border-right: 1px solid #E5E7EB;
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        .sidebar-header {
            padding: 1.5rem;
            border-bottom: 1px solid #E5E7EB;
        }

        .new-chat-btn {
            width: 100%;
            background: var(--gradient);
            color: white;
            padding: 0.75rem;
            border: none;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }

        .new-chat-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
        }

        .chat-history {
            flex: 1;
            overflow-y: auto;
            padding: 1rem;
        }

        .chat-item {
            padding: 0.75rem;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
            cursor: pointer;
            transition: all 0.3s;
            border: 1px solid transparent;
        }

        .chat-item:hover {
            background: var(--white);
            border-color: var(--primary);
        }

        .chat-item.active {
            background: var(--primary);
            color: white;
        }

        .chat-title {
            font-weight: 600;
            margin-bottom: 0.25rem;
            font-size: 0.875rem;
        }

        .chat-preview {
            font-size: 0.75rem;
            opacity: 0.7;
            line-height: 1.4;
        }

        /* Main Chat Area */
        .chat-main {
            flex: 1;
            display: flex;
            flex-direction: column;
            background: var(--white);
        }

        .chat-header {
            padding: 1.5rem 2rem;
            border-bottom: 1px solid #E5E7EB;
            background: var(--white);
        }

        .chat-title-main {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--dark);
            margin-bottom: 0.5rem;
        }

        .chat-subtitle {
            color: var(--gray);
            font-size: 0.875rem;
        }

        .messages-container {
            flex: 1;
            overflow-y: auto;
            padding: 2rem;
            background: var(--light);
        }

        .message {
            margin-bottom: 1.5rem;
            display: flex;
            align-items: flex-start;
            gap: 1rem;
            animation: fadeInUp 0.3s ease-out;
        }

        .message.user {
            flex-direction: row-reverse;
        }

        .message-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            flex-shrink: 0;
            font-size: 0.875rem;
        }

        .message.assistant .message-avatar {
            background: var(--gradient);
            color: white;
        }

        .message.user .message-avatar {
            background: var(--dark);
            color: white;
        }

        .message-content {
            max-width: 70%;
            padding: 1rem 1.5rem;
            border-radius: 1rem;
            position: relative;
            white-space: pre-wrap;
            line-height: 1.6;
        }

        .message.assistant .message-content {
            background: var(--white);
            border: 1px solid #E5E7EB;
            border-bottom-left-radius: 0.25rem;
        }

        .message.user .message-content {
            background: var(--gradient);
            color: white;
            border-bottom-right-radius: 0.25rem;
        }

        .message-time {
            font-size: 0.75rem;
            opacity: 0.7;
            margin-top: 0.5rem;
        }

        .typing-indicator {
            display: none;
            align-items: center;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }

        .typing-indicator.show {
            display: flex;
        }

        .typing-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--gray);
            font-style: italic;
            padding: 1rem 1.5rem;
            background: var(--white);
            border: 1px solid #E5E7EB;
            border-radius: 1rem;
            border-bottom-left-radius: 0.25rem;
        }

        .typing-dots {
            display: flex;
            gap: 0.25rem;
        }

        .typing-dot {
            width: 6px;
            height: 6px;
            background: var(--gray);
            border-radius: 50%;
            animation: typingPulse 1.5s infinite;
        }

        .typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }

        .typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes typingPulse {
            0%, 60%, 100% { opacity: 0.3; }
            30% { opacity: 1; }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Input Area */
        .input-container {
            padding: 1.5rem 2rem;
            background: var(--white);
            border-top: 1px solid #E5E7EB;
        }

        .input-wrapper {
            position: relative;
            max-width: 800px;
            margin: 0 auto;
        }

        .input-field {
            width: 100%;
            padding: 1rem 3.5rem 1rem 1.5rem;
            border: 2px solid #E5E7EB;
            border-radius: 1rem;
            font-family: inherit;
            font-size: 1rem;
            resize: none;
            outline: none;
            transition: all 0.3s;
            min-height: 60px;
            max-height: 150px;
        }

        .input-field:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .send-button {
            position: absolute;
            right: 0.75rem;
            bottom: 0.75rem;
            width: 40px;
            height: 40px;
            background: var(--gradient);
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .send-button:hover:not(:disabled) {
            transform: scale(1.1);
        }

        .send-button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }

        /* Welcome Message */
        .welcome-message {
            text-align: center;
            padding: 2rem;
            max-width: 600px;
            margin: 2rem auto;
        }

        .welcome-title {
            font-size: 2rem;
            font-weight: 800;
            background: var(--gradient);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin-bottom: 1rem;
        }

        .welcome-subtitle {
            color: var(--gray);
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .quick-actions {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 2rem;
        }

        .quick-action {
            background: var(--white);
            border: 2px solid #E5E7EB;
            border-radius: 1rem;
            padding: 1.5rem;
            cursor: pointer;
            transition: all 0.3s;
            text-align: left;
        }

        .quick-action:hover {
            border-color: var(--primary);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.1);
        }

        .quick-action-icon {
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        .quick-action-title {
            font-weight: 600;
            margin-bottom: 0.5rem;
            color: var(--dark);
        }

        .quick-action-description {
            color: var(--gray);
            font-size: 0.875rem;
        }

        /* Error States */
        .error-message {
            background: #FEF2F2;
            border: 1px solid #FECACA;
            color: var(--danger);
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            margin: 1rem 2rem;
            display: none;
        }

        .error-message.show {
            display: block;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .sidebar {
                display: none;
            }
            
            .header {
                padding: 1rem;
            }
            
            .messages-container {
                padding: 1rem;
            }
            
            .input-container {
                padding: 1rem;
            }
            
            .message-content {
                max-width: 85%;
            }
            
            .quick-actions {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <div class="header">
        <div class="logo">Ask Aunt Kate</div>
        <div class="header-actions">
            <div class="status-indicator">
                <div class="status-dot" id="statusDot"></div>
                <span id="statusText">Connected</span>
            </div>
            <a href="/" class="btn btn-secondary">← Back to Home</a>
            <button class="btn btn-primary" onclick="clearChat()">🗑️ Clear Chat</button>
        </div>
    </div>

    <!-- Main Chat Container -->
    <div class="chat-container">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="sidebar-header">
                <button class="new-chat-btn" onclick="startNewChat()">
                    ➕ New Conversation
                </button>
            </div>
            <div class="chat-history" id="chatHistory">
                <div class="chat-item active">
                    <div class="chat-title">Healthcare Advocacy</div>
                    <div class="chat-preview">Ask me about insurance denials, medical bills, or patient rights...</div>
                </div>
            </div>
        </div>

        <!-- Main Chat Area -->
        <div class="chat-main">
            <div class="chat-header">
                <div class="chat-title-main">Your Personal Healthcare Advocate</div>
                <div class="chat-subtitle">Fighting for your rights in our complex healthcare system</div>
            </div>

            <!-- Error Message -->
            <div class="error-message" id="errorMessage">
                <strong>Connection Error:</strong> <span id="errorText">Unable to connect to Aunt Kate. Please check your internet connection and try again.</span>
            </div>

            <!-- Messages Container -->
            <div class="messages-container" id="messagesContainer">
                <!-- Welcome Message -->
                <div class="welcome-message" id="welcomeMessage">
                    <div class="welcome-title">👋 Hello! I'm Aunt Kate</div>
                    <div class="welcome-subtitle">
                        I'm your personal healthcare advocate, here 24/7 to help you navigate insurance denials, 
                        understand medical bills, fight for proper care, and know your rights as a patient. 
                        What healthcare challenge can I help you with today?
                    </div>
                    
                    <div class="quick-actions">
                        <div class="quick-action" onclick="sendQuickMessage('My insurance denied my surgery - what should I do?')">
                            <div class="quick-action-icon">📋</div>
                            <div class="quick-action-title">Insurance Denial Appeal</div>
                            <div class="quick-action-description">Get step-by-step guidance on fighting denials and winning appeals</div>
                        </div>
                        
                        <div class="quick-action" onclick="sendQuickMessage('I got a huge medical bill with errors - how do I dispute it?')">
                            <div class="quick-action-icon">💰</div>
                            <div class="quick-action-title">Medical Bill Review</div>
                            <div class="quick-action-description">Spot billing errors and negotiate fair payment terms</div>
                        </div>
                        
                        <div class="quick-action" onclick="sendQuickMessage('My prescription was denied - why does this happen?')">
                            <div class="quick-action-icon">💊</div>
                            <div class="quick-action-title">Prescription Coverage</div>
                            <div class="quick-action-description">Appeal medication denials and find cost-saving alternatives</div>
                        </div>
                        
                        <div class="quick-action" onclick="sendQuickMessage('What are my rights as a patient?')">
                            <div class="quick-action-icon">⚖️</div>
                            <div class="quick-action-title">Know Your Rights</div>
                            <div class="quick-action-description">Understand patient rights and how to advocate effectively</div>
                        </div>
                    </div>
                </div>

                <!-- Typing Indicator -->
                <div class="typing-indicator" id="typingIndicator">
                    <div class="message-avatar" style="background: var(--gradient); color: white;">AK</div>
                    <div class="typing-content">
                        Aunt Kate is consulting Claude
                        <div class="typing-dots">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Input Area -->
            <div class="input-container">
                <div class="input-wrapper">
                    <textarea 
                        id="messageInput" 
                        class="input-field" 
                        placeholder="Describe your healthcare challenge - insurance denials, medical bills, prescription issues, or patient rights questions..."
                        rows="1"
                    ></textarea>
                    <button class="send-button" id="sendButton" onclick="sendMessage()">
                        ➤
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Global variables
        let messageHistory = [];
        let isConnected = true;
        let apiEndpoint = '/api/chat';

        // Initialize the chatbot - THIS FUNCTION WAS MISSING!
        function initialize() {
            console.log('Ask Aunt Kate Chatbot initialized successfully! 🩺');
            
            // Set up event listeners
            setupEventListeners();
            
            // Auto-resize textarea
            autoResizeTextarea();
            
            // Load saved chat history
            loadChatHistory();
            
            // Focus on input
            document.getElementById('messageInput').focus();
            
            // Test API connection
            testConnection();
        }

        function setupEventListeners() {
            const messageInput = document.getElementById('messageInput');
            const sendButton = document.getElementById('sendButton');

            // Enter key to send message
            messageInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                }
            });

            // Auto-resize textarea
            messageInput.addEventListener('input', autoResizeTextarea);

            // Disable send button when input is empty
            messageInput.addEventListener('input', function() {
                const isEmpty = this.value.trim() === '';
                sendButton.disabled = isEmpty;
            });
        }

        function autoResizeTextarea() {
            const textarea = document.getElementById('messageInput');
            textarea.style.height = 'auto';
            textarea.style.height = Math.min(textarea.scrollHeight, 150) + 'px';
        }

        async function sendMessage() {
            const input = document.getElementById('messageInput');
            const message = input.value.trim();
            
            if (!message) return;

            // Disable send button
            const sendButton = document.getElementById('sendButton');
            sendButton.disabled = true;

            // Clear input
            input.value = '';
            autoResizeTextarea();

            // Hide welcome message
            hideWelcomeMessage();

            // Add user message
            addMessage('user', message);

            // Show typing indicator
            showTypingIndicator();

            try {
                // Call your existing API
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: message })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                
                // Hide typing indicator
                hideTypingIndicator();

                if (data.status === 'success') {
                    // Add Aunt Kate's response from Claude
                    addMessage('assistant', data.response);
                    updateConnectionStatus(true);
                } else if (data.status === 'partial_success') {
                    // Add fallback response with indicator
                    addMessage('assistant', data.response, null, true);
                    updateConnectionStatus(true);
                    console.warn('Using fallback response:', data.note);
                } else {
                    throw new Error(data.message || 'Unknown error occurred');
                }

            } catch (error) {
                console.error('API Error:', error);
                hideTypingIndicator();
                updateConnectionStatus(false);
                showError(`Failed to get response from Aunt Kate: ${error.message}`);
                
                // Add fallback message
                addMessage('assistant', `I'm sorry, I'm having trouble connecting right now. Please try again in a moment. If the problem persists, you can:\n\n• Refresh the page\n• Check your internet connection\n• Contact support if issues continue\n\nI'm here to help with your healthcare advocacy needs!`);
            } finally {
                // Re-enable send button
                sendButton.disabled = false;
            }
        }

        function sendQuickMessage(message) {
            const input = document.getElementById('messageInput');
            input.value = message;
            sendMessage();
        }

        function addMessage(sender, content, timestamp = null, isFallback = false) {
            const messagesContainer = document.getElementById('messagesContainer');
            const messageTime = timestamp || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            const messageElement = document.createElement('div');
            messageElement.className = `message ${sender}`;
            
            const avatar = sender === 'user' ? 'You' : 'AK';
            
            // Add indicator for fallback responses
            const fallbackIndicator = isFallback ? 
                '<div style="font-size: 0.75rem; opacity: 0.7; margin-bottom: 0.5rem; color: var(--warning);">⚠️ Using backup response - Claude temporarily unavailable</div>' : '';
            
            messageElement.innerHTML = `
                <div class="message-avatar">
                    ${avatar}
                </div>
                <div class="message-content">
                    ${fallbackIndicator}
                    <div class="message-text">${content}</div>
                    <div class="message-time">${messageTime}</div>
                </div>
            `;
            
            messagesContainer.appendChild(messageElement);
            
            // Store in history
            messageHistory.push({
                sender,
                content,
                timestamp: messageTime,
                isFallback: isFallback
            });
            
            // Scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Save to localStorage (if available)
            saveChatHistory();
        }

        function showTypingIndicator() {
            const indicator = document.getElementById('typingIndicator');
            indicator.classList.add('show');
            
            const messagesContainer = document.getElementById('messagesContainer');
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }

        function hideTypingIndicator() {
            const indicator = document.getElementById('typingIndicator');
            indicator.classList.remove('show');
        }

        function hideWelcomeMessage() {
            const welcomeMessage = document.getElementById('welcomeMessage');
            if (welcomeMessage) {
                welcomeMessage.style.display = 'none';
            }
        }

        function showError(message) {
            const errorElement = document.getElementById('errorMessage');
            const errorText = document.getElementById('errorText');
            errorText.textContent = message;
            errorElement.classList.add('show');
            
            setTimeout(() => {
                errorElement.classList.remove('show');
            }, 5000);
        }

        function updateConnectionStatus(connected) {
            isConnected = connected;
            const statusText = document.getElementById('statusText');
            const statusDot = document.getElementById('statusDot');
            
            if (connected) {
                statusText.textContent = 'Connected';
                statusDot.classList.remove('offline');
            } else {
                statusText.textContent = 'Connection Issues';
                statusDot.classList.add('offline');
            }
        }

        async function testConnection() {
            try {
                const response = await fetch(apiEndpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message: 'test' })
                });
                
                updateConnectionStatus(response.ok);
            } catch (error) {
                console.warn('Connection test failed:', error);
                updateConnectionStatus(false);
            }
        }

        function startNewChat() {
            messageHistory = [];
            const messagesContainer = document.getElementById('messagesContainer');
            
            // Reset to welcome message
            messagesContainer.innerHTML = `
                <div class="welcome-message" id="welcomeMessage">
                    <div class="welcome-title">👋 Hello! I'm Aunt Kate</div>
                    <div class="welcome-subtitle">
                        I'm your personal healthcare advocate, here 24/7 to help you navigate insurance denials, 
                        understand medical bills, fight for proper care, and know your rights as a patient. 
                        What healthcare challenge can I help you with today?
                    </div>
                    
                    <div class="quick-actions">
                        <div class="quick-action" onclick="sendQuickMessage('My insurance denied my surgery - what should I do?')">
                            <div class="quick-action-icon">📋</div>
                            <div class="quick-action-title">Insurance Denial Appeal</div>
                            <div class="quick-action-description">Get step-by-step guidance on fighting denials and winning appeals</div>
                        </div>
                        
                        <div class="quick-action" onclick="sendQuickMessage('I got a huge medical bill with errors - how do I dispute it?')">
                            <div class="quick-action-icon">💰</div>
                            <div class="quick-action-title">Medical Bill Review</div>
                            <div class="quick-action-description">Spot billing errors and negotiate fair payment terms</div>
                        </div>
                        
                        <div class="quick-action" onclick="sendQuickMessage('My prescription was denied - why does this happen?')">
                            <div class="quick-action-icon">💊</div>
                            <div class="quick-action-title">Prescription Coverage</div>
                            <div class="quick-action-description">Appeal medication denials and find cost-saving alternatives</div>
                        </div>
                        
                        <div class="quick-action" onclick="sendQuickMessage('What are my rights as a patient?')">
                            <div class="quick-action-icon">⚖️</div>
                            <div class="quick-action-title">Know Your Rights</div>
                            <div class="quick-action-description">Understand patient rights and how to advocate effectively</div>
                        </div>
                    </div>
                </div>

                <div class="typing-indicator" id="typingIndicator">
                    <div class="message-avatar" style="background: var(--gradient); color: white;">AK</div>
                    <div class="typing-content">
                        Aunt Kate is consulting Claude
                        <div class="typing-dots">
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                            <div class="typing-dot"></div>
                        </div>
                    </div>
                </div>
            `;
            
            saveChatHistory();
        }

        function clearChat() {
            if (confirm('Are you sure you want to clear this conversation? This action cannot be undone.')) {
                startNewChat();
            }
        }

        function saveChatHistory() {
            try {
                const chatData = {
                    messages: messageHistory,
                    timestamp: new Date().toISOString()
                };
                // In a real implementation, save to your backend or localStorage
                console.log('Chat saved:', chatData);
            } catch (error) {
                console.warn('Could not save chat history:', error);
            }
        }

        function loadChatHistory() {
            try {
                // In a real implementation, load from your backend or localStorage
                console.log('Chat history loaded');
            } catch (error) {
                console.warn('Could not load chat history:', error);
            }
        }

        // Initialize when page loads
        document.addEventListener('DOMContentLoaded', function() {
            initialize();
        });

        // Export initialize function globally to prevent the error
        window.initialize = initialize;

        // Monitor connection status
        window.addEventListener('online', () => updateConnectionStatus(true));
        window.addEventListener('offline', () => updateConnectionStatus(false));

        console.log('Ask Aunt Kate Healthcare Advocacy Chatbot ready! 🩺💪');
    </script>
</body>
</html>
