function search() {
  const id = document.getElementById("studentId").value.trim();
  const resultDiv = document.getElementById("result");
  const btnText = document.getElementById("btnText");
  const spinner = document.getElementById("loadingSpinner");
  
  // Validate input
  if (!id) {
    resultDiv.innerHTML = '<span class="error">⚠️ Please enter a Student ID</span>';
    return;
  }
  
  // Show loading state
  btnText.style.display = 'none';
  spinner.style.display = 'block';
  document.getElementById("checkBtn").disabled = true;
  
  // Clear previous result
  resultDiv.innerHTML = '';
  
  // Fetch data
  fetch("https://script.google.com/macros/s/AKfycbwu4jbHAej1_Kn6zSKtuAxgDLexj5MIq_5g5mDaoFhQznlRR8FXwIsat9-pGn_44oXdTg/exec?id=" + id)
    .then(res => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    })
    .then(data => {
      if (data.error) {
        resultDiv.innerHTML = `<span class="error">❌ ${data.error}</span>`;
      } else {
        resultDiv.innerHTML = `
          <div class="success">
            <div style="display: flex; align-items: center; margin-bottom: 10px;">
              <i class="fas fa-user-circle" style="font-size: 24px; margin-right: 10px;"></i>
              <strong style="font-size: 20px;">Student Information</strong>
            </div>
            <div style="margin-left: 34px;">
              <p>📝 <strong>ID:</strong> ${id}</p>
              <p>👤 <strong>Name:</strong> ${data.name}</p>
              <p>📚 <strong>Course:</strong> ${data.course}</p>
              <p>📚 <strong>Course ID:</strong> ${data.year}</p>
              ${data.room ? `<p>🎓 <strong>Room:</strong> ${data.room}</p>` : ''}
            </div>
          </div>
        `;
      }
    })
    .catch(err => {
      console.error('Error:', err);
      resultDiv.innerHTML = '<span class="error">⚠️ An error occurred while fetching data. Please try again.</span>';
    })
    .finally(() => {
      // Reset button state
      btnText.style.display = 'inline';
      spinner.style.display = 'none';
      document.getElementById("checkBtn").disabled = false;
    });
}

// Allow pressing Enter key to submit
document.getElementById("studentId").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    search();
  }
});
