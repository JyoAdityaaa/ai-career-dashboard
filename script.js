const themeToggle = document.getElementById('themeToggle');
const htmlTag = document.documentElement;

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlTag.getAttribute('data-theme');
  htmlTag.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
});

const analyzeBtn = document.getElementById('analyzeBtn');
const courseInput = document.getElementById('courseInput');
const resultArea = document.getElementById('resultArea');

analyzeBtn.addEventListener('click', async () => {
  const topic = courseInput.value.trim();
  if (!topic) return alert('Please enter a topic.');

  resultArea.innerHTML = `<p>🔄 Fetching insights for <strong>${topic}</strong>...</p>`;

  // Replace this block with Make.com API integration or OpenRouter fetch
  setTimeout(() => {
    resultArea.innerHTML = `
      <div class="result-box">
        <h3>Career Insights for: ${topic}</h3>
        <ul>
          <li>📘 Top Resources: <a href="https://github.com/search?q=${encodeURIComponent(topic)}" target="_blank">GitHub</a>, YouTube, Coursera</li>
          <li>👨‍💻 Project Ideas: Build a mini project using ${topic}</li>
          <li>🚀 Career Roles: Analyst, Engineer, Researcher</li>
          <li>🧠 Mindset: Learn by doing. Focus on real-world impact.</li>
        </ul>
      </div>
    `;
  }, 1500);
});
