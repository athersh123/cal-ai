// chart.js — High-performance animated Canvas charts (sharp Retina resolution)
export function createBarChart({
  data = [],
  labels = [],
  colors = ['#fd79a8', '#e17055'], // gradient colors or solid color
  height = 200,
  barRadius = 6,
  animate = true,
  showValues = true,
  gradient = true
}) {
  const container = document.createElement('div');
  container.className = 'chart-container';
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = `${height}px`;

  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);

  let animationFrameId;
  let progress = animate ? 0 : 1;

  function renderChart() {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI screens
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const chartHeight = rect.height;

    ctx.clearRect(0, 0, width, chartHeight);

    if (data.length === 0) {
      // Empty state renderer
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No data available', width / 2, chartHeight / 2);
      return;
    }

    // Chart paddings
    const paddingLeft = 16;
    const paddingRight = 16;
    const paddingTop = 28;
    const paddingBottom = 28;

    const graphWidth = width - paddingLeft - paddingRight;
    const graphHeight = chartHeight - paddingTop - paddingBottom;

    const maxVal = Math.max(...data, 1000) * 1.1; // buffer top
    const barWidth = Math.min((graphWidth / data.length) * 0.55, 36);
    const spacing = (graphWidth - (barWidth * data.length)) / (data.length - 1 || 1);

    // Draw background guide lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = paddingTop + (graphHeight * (i / 3));
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(width - paddingRight, y);
      ctx.stroke();
    }

    // Render bars
    for (let i = 0; i < data.length; i++) {
      const val = data[i];
      const animatedVal = val * progress;
      const x = paddingLeft + (i * (barWidth + spacing)) + (spacing / 2);
      
      const barHeight = (animatedVal / maxVal) * graphHeight;
      const y = paddingTop + graphHeight - barHeight;

      if (barHeight > 0) {
        ctx.save();
        ctx.beginPath();
        
        // Rounded bar path (top corners rounded)
        ctx.moveTo(x, y + barRadius);
        ctx.arcTo(x, y, x + barWidth, y, barRadius);
        ctx.arcTo(x + barWidth, y, x + barWidth, y + barHeight, barRadius);
        ctx.lineTo(x + barWidth, y + barHeight);
        ctx.lineTo(x, y + barHeight);
        ctx.closePath();

        // Colors & Gradient
        if (gradient && colors.length >= 2) {
          const grad = ctx.createLinearGradient(x, y, x, y + barHeight);
          grad.addColorStop(0, colors[0]);
          grad.addColorStop(1, colors[1]);
          ctx.fillStyle = grad;
        } else {
          ctx.fillStyle = colors[0] || '#fd79a8';
        }

        ctx.fill();
        ctx.restore();
      }

      // Draw values on top
      if (showValues && progress >= 0.8) {
        ctx.fillStyle = 'var(--text-primary)';
        ctx.font = 'bold 11px Outfit, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(Math.round(val).toString(), x + barWidth / 2, y - 8);
      }

      // Draw x labels
      if (labels[i]) {
        ctx.fillStyle = 'var(--text-secondary)';
        ctx.font = '500 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(labels[i], x + barWidth / 2, chartHeight - 8);
      }
    }
  }

  // Animation loop
  function animateChart() {
    if (progress < 1) {
      progress += 0.05;
      renderChart();
      animationFrameId = requestAnimationFrame(animateChart);
    } else {
      progress = 1;
      renderChart();
    }
  }

  // ResizeObserver to handle canvas resizing nicely
  const resizeObserver = new ResizeObserver(() => {
    renderChart();
  });

  // Schedule render
  setTimeout(() => {
    resizeObserver.observe(canvas);
    if (animate) {
      animateChart();
    } else {
      renderChart();
    }
  }, 50);

  // Clean up references
  container.cleanup = () => {
    cancelAnimationFrame(animationFrameId);
    resizeObserver.disconnect();
  };

  return container;
}

export function createLineChart({
  data = [],
  labels = [],
  color = '#00cec9',
  fillColor = 'rgba(0, 206, 201, 0.08)',
  height = 200,
  animate = true,
  showDots = true,
  smooth = true
}) {
  const container = document.createElement('div');
  container.className = 'chart-container';
  container.style.position = 'relative';
  container.style.width = '100%';
  container.style.height = `${height}px`;

  const canvas = document.createElement('canvas');
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  container.appendChild(canvas);

  let animationFrameId;
  let progress = animate ? 0 : 1;

  function renderChart() {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const chartHeight = rect.height;

    ctx.clearRect(0, 0, width, chartHeight);

    if (data.length === 0) {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('No data available', width / 2, chartHeight / 2);
      return;
    }

    const paddingLeft = 32;
    const paddingRight = 16;
    const paddingTop = 20;
    const paddingBottom = 28;

    const graphWidth = width - paddingLeft - paddingRight;
    const graphHeight = chartHeight - paddingTop - paddingBottom;

    const minVal = Math.min(...data) * 0.98;
    const maxVal = Math.max(...data) * 1.02;
    const range = (maxVal - minVal) || 10;

    const points = [];
    const stepX = graphWidth / (data.length - 1 || 1);

    for (let i = 0; i < data.length; i++) {
      const val = data[i];
      const animatedVal = minVal + (val - minVal) * progress;
      const x = paddingLeft + (i * stepX);
      const y = paddingTop + graphHeight - ((animatedVal - minVal) / range) * graphHeight;
      points.push({ x, y });
    }

    // Draw horizontal gridlines and Y labels
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'var(--text-secondary)';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    const yTicks = 4;
    for (let i = 0; i < yTicks; i++) {
      const ratio = i / (yTicks - 1);
      const y = paddingTop + graphHeight * ratio;
      const valLabel = maxVal - (range * ratio);
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(width - paddingRight, y);
      ctx.stroke();

      ctx.fillText(valLabel.toFixed(1), paddingLeft - 8, y);
    }

    // Draw lines
    if (points.length > 0) {
      // 1. Fill Area under the line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(points[0].x, paddingTop + graphHeight);
      ctx.lineTo(points[0].x, points[0].y);

      if (smooth && points.length > 2) {
        for (let i = 0; i < points.length - 1; i++) {
          const cpX1 = points[i].x + (points[i + 1].x - points[i].x) / 2;
          const cpY1 = points[i].y;
          const cpX2 = points[i].x + (points[i + 1].x - points[i].x) / 2;
          const cpY2 = points[i + 1].y;
          ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, points[i+1].x, points[i+1].y);
        }
      } else {
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }

      ctx.lineTo(points[points.length - 1].x, paddingTop + graphHeight);
      ctx.closePath();

      if (fillColor) {
        ctx.fillStyle = fillColor;
      } else {
        const fillGrad = ctx.createLinearGradient(0, paddingTop, 0, paddingTop + graphHeight);
        fillGrad.addColorStop(0, `${color}25`); // opacity 15%
        fillGrad.addColorStop(1, `${color}00`); // transparent
        ctx.fillStyle = fillGrad;
      }
      ctx.fill();
      ctx.restore();

      // 2. Main stroke line
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);

      if (smooth && points.length > 2) {
        for (let i = 0; i < points.length - 1; i++) {
          const cpX1 = points[i].x + (points[i + 1].x - points[i].x) / 2;
          const cpY1 = points[i].y;
          const cpX2 = points[i].x + (points[i + 1].x - points[i].x) / 2;
          const cpY2 = points[i + 1].y;
          ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, points[i+1].x, points[i+1].y);
        }
      } else {
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
      ctx.restore();

      // 3. Dots and tooltips
      if (showDots && progress >= 0.8) {
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'var(--bg-primary)';
          ctx.fill();
          ctx.strokeStyle = color;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Value above dot
          ctx.fillStyle = 'var(--text-primary)';
          ctx.font = 'bold 10px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(data[i].toFixed(1), p.x, p.y - 10);
        }
      }
    }

    // Render X labels
    ctx.textAlign = 'center';
    ctx.fillStyle = 'var(--text-secondary)';
    ctx.font = '500 11px Inter, sans-serif';
    for (let i = 0; i < labels.length; i++) {
      if (points[i]) {
        ctx.fillText(labels[i], points[i].x, chartHeight - 8);
      }
    }
  }

  function animateChart() {
    if (progress < 1) {
      progress += 0.05;
      renderChart();
      animationFrameId = requestAnimationFrame(animateChart);
    } else {
      progress = 1;
      renderChart();
    }
  }

  const resizeObserver = new ResizeObserver(() => {
    renderChart();
  });

  setTimeout(() => {
    resizeObserver.observe(canvas);
    if (animate) {
      animateChart();
    } else {
      renderChart();
    }
  }, 50);

  container.cleanup = () => {
    cancelAnimationFrame(animationFrameId);
    resizeObserver.disconnect();
  };

  return container;
}
