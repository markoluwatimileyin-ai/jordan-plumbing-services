const API = 'https://jordan-plumbing-services-production.up.railway.app/api';

/* SERVICES DATA */
const services = [
  {name:'Leak Repair', desc:'Fast leak detection & repair.', price:15000, img:'https://images.unsplash.com/photo-1669920282671-e2f03e99513f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0'},
  {name:'Drain Cleaning', desc:'Professional drain unblocking & cleaning.', price:18000, img:'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?fit=crop&w=600&q=80'},
  {name:'Pipe Installation', desc:'Durable pipe installation & replacement.', price:25000, img:'https://plus.unsplash.com/premium_photo-1661373709869-dc361f34cf05?w=600&auto=format&fit=crop&q=60'},
  {name:'Water Heater Installation', desc:'Safe & professional heater installation.', price:40000, img:'https://media.istockphoto.com/id/2228020153/photo/modern-gas-water-heater-and-boiler-system-on-bathroom-wall.webp?a=1&b=1&s=612x612&w=0&k=20&c=5rm6SpLFrpgXywopcGOqaXCdzCk63FVTXI-u0nMnqRY='},
  {name:'Water Tap Installation', desc:'Affordable water tap installation.', price:10000, img:'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/15/543218/1.jpg?7230'},
  {name:'Basin Installation', desc:'Affordable and fast basin installation.', price:90000, img:'https://images.unsplash.com/photo-1643324520514-8ed019f29561?w=700&auto=format&fit=crop&q=60'},
  {name:'WC Installation', desc:'Quick and affordable WC installation.', price:110000, img:'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/60/149226/1.jpg?5585'},
  {name:'Water Tank Installation', desc:'Reliable water tank installation.', price:110000, img:'https://images.unsplash.com/photo-1629195980786-1f791226dcd7?w=600&auto=format&fit=crop&q=60'},
];

/* RENDER SERVICES */
const servicesGrid = document.getElementById('services-grid');
const serviceSelect = document.getElementById('serviceSelect');

services.forEach(s => {
  // Render card
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <img src="${s.img}" alt="${s.name}">
    <h3>${s.name}</h3>
    <p>${s.desc}</p>
    <p class="price">₦${s.price.toLocaleString()}</p>
    <a href="https://wa.me/2348140016532?text=Hi, I need help with ${encodeURIComponent(s.name)}" 
       target="_blank" 
       style="display:inline-block; background:#25D366; color:#fff; padding:8px 16px; border-radius:6px; font-weight:bold; margin-top:4px;">
      <i class="fab fa-whatsapp"></i> Request Service
    </a>
  `;
  servicesGrid.appendChild(card);

  // Add to select dropdown
  const option = document.createElement('option');
  option.value = s.name;
  option.textContent = s.name;
  serviceSelect.appendChild(option);
});

/* BOOKING FORM */
document.getElementById('booking-form').addEventListener('submit', async e => {
  e.preventDefault();
  const body = {
    name: document.getElementById('name').value,
    phone: document.getElementById('phone').value,
    service: document.getElementById('serviceSelect').value,
    problem: document.getElementById('problem').value,
    email: 'not provided',
    location: 'not provided',
  };
  try {
    const res = await fetch(`${API}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
      alert('Request sent! We will call you shortly.');
      e.target.reset();
    } else {
      alert(data.message || 'Something went wrong');
    }
  } catch (err) {
    alert('Could not connect to server. Please call us directly on +234 814 001 6532');
  }
});

/* CONTACT FORM */
document.getElementById('contact-form').addEventListener('submit', async e => {
  e.preventDefault();
  const inputs = e.target.querySelectorAll('input, textarea');
  const body = {
    name: inputs[0].value,
    email: inputs[1].value,
    message: inputs[2].value,
  };
  try {
    const res = await fetch(`${API}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (res.ok) {
      alert('Message sent! We will reply within 24 hours.');
      e.target.reset();
    } else {
      alert(data.message || 'Message failed to send');
    }
  } catch (err) {
    alert('Could not connect to server. Please WhatsApp us directly.');
  }
});

/* SCROLL ANIMATION */
const sections = document.querySelectorAll('section, .hero, .trust-section, .testimonials, .cta-section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

/* SHOW HERO IMMEDIATELY */
window.addEventListener('load', () => {
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.add('show');
});
