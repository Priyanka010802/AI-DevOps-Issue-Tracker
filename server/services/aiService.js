const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Analyzes an issue description to classify category, priority, and suggest fixes.
 */
exports.analyzeIssue = async (issueTitle, issueDescription) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a DevOps AI Assistant. Analyze the following issue and provide a structured JSON response.
      
      Issue Title: ${issueTitle}
      Issue Description: ${issueDescription}

      Respond ONLY with a JSON object in this format:
      {
        "category": "Deployment Bug | UI Error | Backend Failure | Database Issue | Security | Infrastructure",
        "priority": "Low | Medium | High | Critical",
        "severity": "Minor | Major | Critical | Blocker",
        "suggestedLabels": ["label1", "label2"],
        "summary": "Short concise summary",
        "suggestion": "Steps to fix the issue"
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the text (in case model wraps it in markdown)
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error("Failed to parse AI response");
  } catch (error) {
    console.error("AI Analysis Error:", error);
    return {
      category: "Unclassified",
      priority: "Medium",
      severity: "Minor",
      suggestedLabels: [],
      summary: "AI analysis failed.",
      suggestion: "Please review manually."
    };
  }
};

/**
 * Analyzes deployment logs to find root cause.
 */
exports.analyzeLogs = async (logs) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      You are a Senior DevOps Engineer. Analyze these deployment logs and identify the root cause.
      
      Logs:
      ${logs.substring(0, 5000)} // Truncate if too long

      Respond ONLY with a JSON object:
      {
        "rootCause": "Explanation of what went wrong",
        "failedService": "Name of the service/process that failed",
        "suggestedFix": "Shell command or configuration change to fix it",
        "confidence": 0-100
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    throw new Error("Failed to parse AI response");
  } catch (error) {
    console.error("AI Log Analysis Error:", error);
    return {
      rootCause: "Unknown failure in logs.",
      failedService: "Unknown",
      suggestedFix: "Check logs manually.",
      confidence: 0
    };
  }
};
