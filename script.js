document.getElementById('careerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const input = document.getElementById('courseInput').value.trim();
  const output = document.getElementById('responseOutput');
  const loading = document.getElementById('loading');
  const resultSection = document.getElementById('resultSection');

  if (!input) return;

  loading.style.display = 'block';
  resultSection.style.display = 'none';
  output.innerHTML = '';

  const prompt = `I am building a custom AI Career Dashboard that helps learners explore the right resources based on their project ideas or course interests. The user input is: "${input}".

Act as a Career Coach AI and provide the following:
1. A clear summary of what the topic is and its real-world applications.
2. Learning roadmap with free and trusted resources (like official docs, YouTube playlists, GitHub repos).
3. Mindset or approach to follow while learning this topic.
4. Project ideas or use cases a learner can build on this.
Make the response organized and actionable for self-learners.`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer YOUR_API_KEY",  // Replace with your actual key in Make.com
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a career coach AI specialized in recommending learning paths and resources."
          },
          {
            role: "user",
            content: prompt
          }
        ]
      })
    });

    const data = await response.json();
    const aiText = data.choices[0]?.message?.content || "❗ No response received.";

    output.innerHTML = aiText.replace(/\n/g, "<br>");
    resultSection.style.display = 'block';
  } catch (error) {
    output.innerHTML = `❌ Error fetching data: ${error.message}`;
    resultSection.style.display = 'block';
  } finally {
    loading.style.display = 'none';
  }
});
