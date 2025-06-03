// api/chat.js - Ask Aunt Kate Healthcare Advocacy API with Claude Integration

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests' 
    });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: 'Missing message',
        message: 'Please provide a message in your request'
      });
    }

    console.log('Received message:', message);

    // Call Claude API for healthcare advocacy response
    const response = await getClaudeResponse(message);

    return res.status(200).json({
      response: response,
      status: 'success',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      status: 'error',
      timestamp: new Date().toISOString()
    });
  }
}

async function getClaudeResponse(userMessage) {
  const CLAUDE_API_KEY = process.env.ANTHROPIC_API_KEY;
  
  if (!CLAUDE_API_KEY) {
    console.error('Missing ANTHROPIC_API_KEY environment variable');
    throw new Error('ANTHROPIC_API_KEY environment variable is not set. Please add your API key to your hosting platform.');
  }

  const systemPrompt = `You are Aunt Kate, a knowledgeable and compassionate healthcare advocate who helps people navigate the complex American healthcare system. You have deep expertise in:

- Insurance denials and appeals processes
- Medical billing disputes and error detection  
- Patient rights and healthcare law
- Prescription coverage and medication access
- Healthcare provider communication
- Medical appointment preparation
- Financial assistance and cost reduction strategies

Your personality:
- Warm, supportive, and empowering
- Direct and actionable in your advice
- Never condescending - you meet people where they are
- Passionate about healthcare justice and patient rights
- You use clear, jargon-free language
- You provide specific, step-by-step guidance

Your responses should:
- Focus on actionable steps the person can take immediately
- Include relevant timelines and deadlines when applicable
- Mention specific rights and protections when relevant
- Suggest documentation they should gather
- Provide scripts or templates for difficult conversations
- Explain the reasoning behind insurance/medical decisions
- Offer multiple options when available
- Emphasize that they deserve quality healthcare

Important: Always stay within healthcare advocacy scope. You don't provide medical advice or diagnose conditions, but you help people advocate for proper care, understand bills, appeal denials, and know their rights.`;

  console.log('Calling Claude API...');

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1500,
        temperature: 0.3,
        system: systemPrompt,
        messages: [
          {
            role: 'user',
            content: userMessage
          }
        ]
      })
    });

    console.log('Claude API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error response:', errorText);
      
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch (e) {
        errorData = { error: { message: errorText } };
      }
      
      throw new Error(`Claude API error (${response.status}): ${errorData.error?.message || errorText}`);
    }

    const data = await response.json();
    console.log('Claude API success');
    
    if (!data.content || !data.content[0] || !data.content[0].text) {
      console.error('Invalid Claude response format:', data);
      throw new Error('Invalid response format from Claude API');
    }

    return data.content[0].text;

  } catch (fetchError) {
    console.error('Claude API fetch error:', fetchError);
    throw new Error(`Failed to connect to Claude API: ${fetchError.message}`);
  }
}

// Log environment check on startup
console.log('API startup check:');
console.log('- ANTHROPIC_API_KEY exists:', !!process.env.ANTHROPIC_API_KEY);
console.log('- Node.js version:', process.version);
