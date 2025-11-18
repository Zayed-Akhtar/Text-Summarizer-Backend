process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const https = require("https");

https.get("https://api.perplexity.ai/chat/completions", res => {
    console.log("Connected! Status:", res.statusCode);
}).on("error", err => {
    console.error("ERR:", err);
});