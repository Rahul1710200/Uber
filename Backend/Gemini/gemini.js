const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports.getgeminiresponse = async (prompt) => {
    const apiKey = process.env.GEMINI_API_KEY;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    

    const result = await model.generateContent(prompt);
    const result2 = result.response.text();
    return result2;


};

