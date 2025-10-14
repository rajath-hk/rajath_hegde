import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Senior Developer at TechCorp",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Rajath is an exceptional developer who consistently delivers high-quality code. His problem-solving skills and attention to detail make him a valuable team member.",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Product Manager at InnovateX",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Working with Rajath was a pleasure. He translated our product requirements into elegant technical solutions and always met deadlines.",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "CTO at StartupHub",
      avatar: "https://randomuser.me/api/portraits/men/67.jpg",
      content: "Rajath's full-stack expertise helped us build a scalable platform from scratch. His architectural decisions have proven to be robust and maintainable.",
    },
  ];

  const stories = [
    {
      id: 1,
      name: "John Doe",
      avatar: `${basePath}/images/headshot.jpg`,
      timestamp: "5 min ago",
      message: "Just posted a new article on the blog"
    },
    {
      id: 2,
      name: "Jane Smith",
      avatar: `${basePath}/images/headshot.jpg`,
      timestamp: "10 min ago",
      message: "Added new photos to the gallery"
    },
    {
      id: 3,
      name: "Mike Johnson",
      avatar: `${basePath}/images/headshot.jpg`,
      timestamp: "15 min ago",
      message: "Updated his profile information"
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-2">Testimonials</h2>
        <p className="text-muted-foreground">
          What colleagues and clients say about working with me
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div 
            key={testimonial.id} 
            className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                <Image 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div>
                <h3 className="font-semibold">{testimonial.name}</h3>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-muted-foreground italic">"{testimonial.content}"</p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-muted-foreground">
          Want to work together? <a href="#contact" className="text-primary hover:underline">Get in touch</a>
        </p>
      </div>
    </div>
  );
};

export default Testimonials;