'use client';

import React, { useState } from 'react';
import { 
  Image as ImageIcon, 
  Grid, 
  List,
  Heart,
  Download,
  Share2,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);

  const images = [
    {
      id: 1,
      src: 'https://via.placeholder.com/400x300/00E5FF/000000?text=RTSP+Recorder',
      title: 'RTSP Loop Recorder Interface',
      description: 'Main interface of the Android application for recording RTSP video streams',
      category: 'Mobile App',
      date: '2024-01-15'
    },
    {
      id: 2,
      src: 'https://via.placeholder.com/400x300/00E5FF/000000?text=Self-Hosted+Platform',
      title: 'Self-Hosted Video Meeting',
      description: 'Dashboard of the self-hosted video conferencing platform',
      category: 'Web App',
      date: '2024-01-10'
    },
    {
      id: 3,
      src: 'https://via.placeholder.com/400x300/00E5FF/000000?text=GetGo+App',
      title: 'GetGo Web Application',
      description: 'Task management interface with productivity features',
      category: 'Web App',
      date: '2023-12-20'
    },
    {
      id: 4,
      src: 'https://via.placeholder.com/400x300/00E5FF/000000?text=AWS+Certification',
      title: 'AWS Certification',
      description: 'AWS Certified Developer - Associate certification',
      category: 'Certification',
      date: '2023-11-15'
    },
    {
      id: 5,
      src: 'https://via.placeholder.com/400x300/00E5FF/000000?text=Portfolio+Desktop',
      title: 'Portfolio Desktop View',
      description: 'Desktop version of the PortfolioOS interface',
      category: 'Portfolio',
      date: '2024-01-05'
    },
    {
      id: 6,
      src: 'https://via.placeholder.com/400x300/00E5FF/000000?text=Portfolio+Mobile',
      title: 'Portfolio Mobile View',
      description: 'Mobile responsive design of the PortfolioOS',
      category: 'Portfolio',
      date: '2024-01-05'
    },
    {
      id: 7,
      src: 'https://via.placeholder.com/400x300/00E5FF/000000?text=ML+Project',
      title: 'Machine Learning Project',
      description: 'Visualization of a machine learning model output',
      category: 'AI/ML',
      date: '2023-10-30'
    },
    {
      id: 8,
      src: 'https://via.placeholder.com/400x300/00E5FF/000000?text=Docker+Deployment',
      title: 'Docker Deployment',
      description: 'Containerized application deployment using Docker',
      category: 'DevOps',
      date: '2023-09-15'
    }
  ];

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const nextImage = () => {
    if (selectedImage === null) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex].id);
  };

  const prevImage = () => {
    if (selectedImage === null) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex].id);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b p-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Gallery</h1>
          <p className="text-muted-foreground">Showcase of projects and achievements</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button 
            variant={viewMode === 'grid' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4 mr-2" />
            Grid
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4 mr-2" />
            List
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="relative aspect-video">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(image.id);
                    }}
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.includes(image.id) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                  </Button>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold truncate">{image.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{image.category}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">{image.date}</span>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-6 w-6">
                        <Share2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {images.map((image) => (
              <div 
                key={image.id} 
                className="flex items-center p-3 border rounded-lg hover:bg-accent cursor-pointer"
                onClick={() => setSelectedImage(image.id)}
              >
                <div className="w-16 h-16 rounded overflow-hidden mr-4">
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = '/logo.png'; }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{image.title}</h3>
                  <p className="text-sm text-muted-foreground truncate">{image.description}</p>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <span>{image.category}</span>
                    <span className="mx-2">•</span>
                    <span>{image.date}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(image.id);
                  }}
                >
                  <Heart 
                    className={`w-4 h-4 ${favorites.includes(image.id) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Image Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-full">
            <Button
              variant="secondary"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={prevImage}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={nextImage}
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
            
            <div className="relative">
              <img
                src={images.find(img => img.id === selectedImage)?.src || ''}
                alt={images.find(img => img.id === selectedImage)?.title || ''}
                className="max-h-[80vh] w-auto mx-auto"
                onError={(e) => { e.currentTarget.src = '/logo.png'; }}
              />
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h2 className="text-xl font-bold text-white">
                {images.find(img => img.id === selectedImage)?.title}
              </h2>
              <p className="text-white/80 mt-1">
                {images.find(img => img.id === selectedImage)?.description}
              </p>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-4">
                  <span className="text-white/80 text-sm">
                    {images.find(img => img.id === selectedImage)?.category}
                  </span>
                  <span className="text-white/80 text-sm">
                    {images.find(img => img.id === selectedImage)?.date}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => toggleFavorite(selectedImage)}
                  >
                    <Heart 
                      className={`w-4 h-4 mr-2 ${favorites.includes(selectedImage) ? 'fill-red-500 text-red-500' : ''}`} 
                    />
                    {favorites.includes(selectedImage) ? 'Favorited' : 'Favorite'}
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="secondary" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;