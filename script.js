// Theme Toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Form Submit
document.getElementById("career-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const interest = document.getElementById("interest").value;
  const output = document.getElementById("output");
  output.innerHTML = "Fetching career path...";

  try {
    const response = await fetch("https://api.openrouter.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_API_KEY_HERE",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Suggest a complete AI career roadmap for a beginner interested in ${interest}. List resources, tools, and steps clearly.`
          }
        ]
      })
    });

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "No response received.";
    output.innerHTML = `<pre>${result}</pre>`;

    // Optional: Send to Google Sheets using automation
    // fetch("YOUR_MAKE_WEBHOOK_URL", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ interest, response: result })
    // });

  } catch (err) {
    console.error(err);
    output.innerHTML = "Error fetching data. Check console for details.";
  }
});
