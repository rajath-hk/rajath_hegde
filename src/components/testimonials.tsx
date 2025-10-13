import React from 'react';

const TESTIMONIALS = [
  { name: 'Samira Patel', role: 'Product Manager', quote: 'Rajath delivered an exceptional product and was a pleasure to work with.' },
  { name: 'Daniel Lee', role: 'CTO', quote: 'Technically strong and great at communicating complex ideas clearly.' },
  { name: 'Asha Rao', role: 'Client', quote: 'Exceeded expectations and delivered on time with excellent quality.' }
];

const Testimonials = () => (
  <section id="testimonials" className="max-w-4xl mx-auto py-16 px-4">
    <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
    <div className="grid md:grid-cols-3 gap-6">
      {TESTIMONIALS.map((t, i) => (
        <blockquote key={i} className="bg-card rounded-lg shadow p-6 border border-border">
          <p className="mb-4 text-muted-foreground">“{t.quote}”</p>
          <div className="font-semibold">{t.name}</div>
          <div className="text-sm text-muted-foreground">{t.role}</div>
        </blockquote>
      ))}
    </div>
  </section>
);

export default Testimonials;
