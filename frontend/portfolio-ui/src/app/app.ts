import { Component, signal, AfterViewInit, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Hero } from './components/hero/hero';
import { About } from './components/about/about';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Knowledge } from './components/knowledge/knowledge';
import { Contact } from './components/contact/contact';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Hero, About, Skills, Projects, Knowledge, Contact, MatGridListModule],
  styleUrl: './app.css'
})

export class App implements AfterViewInit{
  protected readonly title = signal('portfolio-ui');

  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private particles: any[] = [];
  private particleCount = 120;
  private mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  ngAfterViewInit(): void {
    this.initCanvas();
    this.animate();
    console.log(document.getElementById('bg-canvas'));
  }
  

  private initCanvas() {
    this.canvas = document.getElementById('bg-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resizeCanvas();

    // Create particles
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.7,
        speedY: (Math.random() - 0.5) * 0.7,
        color: `hsl(${Math.random() * 360}, 100%, 60%)`
      });
    }

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
  }
  
  private animate = () => {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw particles
    for (let p of this.particles) {
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.fill();

      // Move particles
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around
      if (p.x > this.canvas.width) p.x = 0;
      if (p.x < 0) p.x = this.canvas.width;
      if (p.y > this.canvas.height) p.y = 0;
      if (p.y < 0) p.y = this.canvas.height;
    }

    // Draw connecting lines
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 120) {
          this.ctx.beginPath();
          this.ctx.strokeStyle = `rgba(0,255,255,${1 - dist/120})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(this.animate);
  }
   
@HostListener('window:resize')
@HostListener('window:orientationchange')
public resizeCanvas() {
  if (!this.canvas || !this.ctx) return;

  const dpr = window.devicePixelRatio || 1;

  const width = window.innerWidth;
  const height = window.innerHeight;

  // Set CSS size
  this.canvas.style.width = width + 'px';
  this.canvas.style.height = height + 'px';

  // Set actual resolution
  this.canvas.width = width * dpr;
  this.canvas.height = height * dpr;

  // Reset scale before applying new one
  this.ctx.setTransform(1, 0, 0, 1, 0, 0);
  this.ctx.scale(dpr, dpr);
}

  
}


