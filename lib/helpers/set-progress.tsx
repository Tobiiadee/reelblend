/** @format */

export function setProgress(value: number): void {
  if (value < 0 || value > 100) {
    throw new Error("Progress value must be between 0 and 100.");
  }

  const progressCircle = document.getElementById("progressCircle");
  const progressValue = document.getElementById("progressValue");

  if (!progressCircle || !progressValue) {
    throw new Error("Progress elements not found in the DOM.");
  }

  const progressBar = progressCircle.querySelector<HTMLElement>(".bg-progress");
  if (!progressBar) {
    throw new Error("Progress bar element not found.");
  }

  // Update the background gradient dynamically
  progressBar.style.background = `conic-gradient(
      #4caf50 ${value * 1}%,
      #d3d3d3 0%
    )`;

  // Update the displayed percentage
  progressValue.textContent = `${value}%`;
}

