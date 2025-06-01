// api/chat.js - Ask Aunt Kate Healthcare Advocacy API

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

    // Generate healthcare advocacy response
    const response = generateHealthcareResponse(message);

    return res.status(200).json({
      response: response,
      status: 'success',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong processing your request'
    });
  }
}

function generateHealthcareResponse(userMessage) {
  const msg = userMessage.toLowerCase();
  
  // Insurance denial responses
  if (msg.includes('denial') || msg.includes('denied')) {
    return `I understand how frustrating insurance denials can be. Here's your action plan:

**Immediate Steps:**
1. **Request the full denial letter** - Get the specific reason code
2. **Review your policy** - Confirm the service should be covered  
3. **Gather documentation** - Medical records, doctor's notes, policy documents
4. **File an appeal within deadlines** - Usually 60-180 days

**Appeal Success Tips:**
• 60% of properly documented appeals succeed
• Use medical terminology, not emotional language
• Get your doctor to write a strong support letter
• Reference specific policy language
• Keep copies and send via certified mail

**Next Steps:**
- Internal appeal first (required)
- External review if internal fails (often binding in your favor)

Would you like help writing your appeal letter or understanding the specific denial codes?`;
  }

  // Insurance general
  if (msg.includes('insurance') || msg.includes('claim')) {
    return `I'm here to help you fight insurance challenges! Here's what I can assist with:

**Common Insurance Issues:**
• Claim denials and appeals
• Prior authorization problems  
• Out-of-network billing disputes
• Coverage questions and interpretations
• Grievance procedures

**Your Rights:**
• Appeal any denial (internal + external review)
• Request detailed explanation of benefits
• Get copies of all medical policies
• File complaints with state insurance commissioner

**Quick Tips:**
• Insurance companies deny 18% of claims initially
• Many denials are overturned on appeal
• Keep detailed records of all communications
• Know your plan's specific deadlines

What specific insurance challenge are you facing? Share details and I'll provide targeted guidance.`;
  }

  // Medical billing
  if (msg.includes('bill') || msg.includes('billing') || msg.includes('charge')) {
    return `Medical billing errors are incredibly common - let me help you spot and fight them!

**Bill Review Checklist:**
• Compare with your medical records
• Look for duplicate charges
• Check for services not received
• Verify correct procedure codes
• Watch for "upcoding" (charging for more expensive services)

**Common Billing Errors:**
• Room charges for unnecessary time
• Medication markups (300%+ markup is common)
• Facility fees vs. provider fees confusion
• Out-of-network surprise billing

**Your Rights:**
• Request itemized, detailed bills
• Negotiate payment plans
• Apply for financial assistance (hospitals must offer this)
• Dispute incorrect charges
• Request charity care if eligible

**Action Steps:**
1. Get itemized bill with procedure codes
2. Cross-reference with visit notes
3. Question anything unclear
4. Contact billing department for errors

Share your specific billing concerns and I'll help you review them!`;
  }

  // Doctor/appointment prep
  if (msg.includes('doctor') || msg.includes('appointment') || msg.includes('physician')) {
    return `Great! Let me help you advocate for yourself with healthcare providers:

**Before Your Appointment:**
• Write down all questions in advance
• List current medications and dosages
• Gather relevant medical history
• Know your insurance requirements
• Bring an advocate if needed

**During Your Visit:**
• Take notes or record (if allowed)
• Ask for clarification on anything unclear
• Request copies of test results
• Discuss all treatment options and costs
• Don't feel rushed - you deserve thorough care

**Red Flags to Watch For:**
• Dismissing your concerns quickly
• Refusing to explain treatments
• Pushing expensive procedures without alternatives
• Not providing cost estimates

**Your Patient Rights:**
• Informed consent for all procedures
• Access to your complete medical records
• Second opinions
• Respectful, culturally competent care
• Clear communication about costs

What specific situation with your healthcare provider can I help you prepare for?`;
  }

  // Prescription/medication help
  if (msg.includes('prescription') || msg.includes('medication') || msg.includes('drug')) {
    return `Prescription costs and access are major challenges - here's how to fight back:

**Cost-Saving Strategies:**
• Ask for generic alternatives (can save 80-90%)
• Compare pharmacy prices (vary 300%+ for same drug)
• Look for manufacturer patient assistance programs
• Try GoodRx or similar discount programs
• Consider 90-day supplies (often cheaper per dose)

**Insurance Issues:**
• Appeal prior authorization denials
• Request step therapy exceptions
• Fight formulary restrictions
• Document medical necessity clearly

**Access Solutions:**
• Pharmacy patient assistance programs
• Samples from your doctor
• Patient advocacy organizations
• State prescription assistance programs

**Your Rights:**
• Know why specific medications are prescribed
• Understand all side effects and alternatives
• Appeal insurance coverage decisions
• Access affordable medications

What specific medication challenge are you facing? High costs? Denied coverage? Side effects? I'll provide targeted help.`;
  }

  // Default comprehensive response
  return `Test again to see if this one finally works. Hello! I'm Aunt Kate, your personal healthcare advocate. I'm here to help you navigate our complex healthcare system and fight for the care you deserve.

**I specialize in helping with:**
🏥 **Insurance Issues** - Denials, appeals, prior authorizations, claim disputes
💰 **Medical Billing** - Error spotting, payment plans, financial assistance
👩‍⚕️ **Provider Communication** - Appointment prep, understanding treatments  
⚖️ **Patient Rights** - What you're entitled to, filing complaints
💊 **Prescription Access** - Cost savings, coverage appeals, alternatives

**Common Questions I Help With:**
• "My insurance denied my claim - now what?"
• "This medical bill seems way too high"
• "How do I prepare for my doctor appointment?"
• "What are my rights as a patient?"
• "I can't afford my medications"

**Quick Examples:**
• Type: "Insurance denied my surgery"
• Type: "Help me review this medical bill"
• Type: "Preparing for doctor appointment"

I'm available 24/7 to help you become your own best healthcare advocate. What challenge are you facing today?`;
}
