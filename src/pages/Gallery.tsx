import { useState } from 'react';
import { Search, Filter, X, Heart, Share2, Download, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import galleryHero from '@/assets/gallery-hero.jpg';
import gallery1 from '@/assets/gallery-1.jpg';
import gallery2 from '@/assets/gallery-2.jpg';
import gallery3 from '@/assets/gallery-3.jpg';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock gallery data
  const galleryItems = [
    {
      id: 1,
      url: gallery1,
      title: 'Collaborative Coding Session',
      category: 'events',
      tags: ['coding', 'teamwork', 'technology'],
      likes: 45,
      description: 'Students working together in our modern tech lab with cutting-edge development tools and equipment.',
      author: 'Sarah Chen',
      date: '2024-01-15'
    },
    {
      id: 2,
      url: gallery3,
      title: 'Student Art Exhibition',
      category: 'projects',
      tags: ['art', 'creativity', 'exhibition'],
      likes: 32,
      description: 'Beautiful artwork from our talented students showcased at the annual creative arts showcase.',
      author: 'Mike Rodriguez',
      date: '2024-01-12'
    },
    {
      id: 3,
      url: gallery2,
      title: 'Innovation Showcase',
      category: 'academic',
      tags: ['innovation', 'presentation', 'technology'],
      likes: 28,
      description: 'Students presenting groundbreaking projects with advanced technology and holographic displays.',
      author: 'Dr. Emily Watson',
      date: '2024-01-10'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600',
      title: 'Study Group Session',
      category: 'community',
      tags: ['study', 'collaboration', 'learning'],
      likes: 67,
      description: 'Students collaborating in our modern study spaces, sharing knowledge and supporting each other.',
      author: 'Alex Kim',
      date: '2024-01-08'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
      title: 'Innovation Lab Project',
      category: 'projects',
      tags: ['innovation', 'technology', 'engineering'],
      likes: 54,
      description: 'Students working on cutting-edge robotics project in our state-of-the-art innovation lab.',
      author: 'Jordan Park',
      date: '2024-01-05'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700',
      title: 'Graduation Ceremony',
      category: 'events',
      tags: ['graduation', 'achievement', 'celebration'],
      likes: 89,
      description: 'Celebrating the success of our graduates as they embark on their next journey.',
      author: 'UniConnect Admin',
      date: '2024-01-03'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
      title: 'Workshop in Action',
      category: 'events',
      tags: ['workshop', 'learning', 'skills'],
      likes: 41,
      description: 'Interactive workshop session where students learn practical skills from industry experts.',
      author: 'Lisa Johnson',
      date: '2024-01-01'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
      title: 'Campus Life',
      category: 'community',
      tags: ['campus', 'lifestyle', 'students'],
      likes: 73,
      description: 'Beautiful moments capturing the vibrant student life on our diverse and inclusive campus.',
      author: 'Campus Photography Club',
      date: '2023-12-28'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Photos', count: galleryItems.length },
    { id: 'events', label: 'Events', count: galleryItems.filter(item => item.category === 'events').length },
    { id: 'projects', label: 'Projects', count: galleryItems.filter(item => item.category === 'projects').length },
    { id: 'academic', label: 'Academic', count: galleryItems.filter(item => item.category === 'academic').length },
    { id: 'community', label: 'Community', count: galleryItems.filter(item => item.category === 'community').length }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${galleryHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text font-urbanist mb-6 animate-fade-in">
            Student Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in animate-delay-200">
            Explore the incredible moments, achievements, and creative works of our vibrant student community.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-card border-glass-border"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={activeFilter === category.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(category.id)}
                  className={`${
                    activeFilter === category.id 
                      ? 'bg-gradient-primary text-white' 
                      : 'glass-button'
                  } transition-all duration-300`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {category.label} ({category.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Masonry Gallery */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                className={`break-inside-avoid glass-card overflow-hidden group cursor-pointer hover:scale-105 transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedImage(item)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-white font-semibold text-lg mb-2 font-urbanist">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Heart className="h-4 w-4 text-red-400" />
                          <span className="text-white text-sm">{item.likes}</span>
                        </div>
                        <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 font-urbanist">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {item.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="outline" 
                        className="text-xs border-glass-border bg-glass"
                      >
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>by {item.author}</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No images found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl glass-card border-glass-border p-0">
          {selectedImage && (
            <div className="relative">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 glass-button"
                onClick={() => setSelectedImage(null)}
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Image */}
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[70vh] object-contain rounded-t-xl"
              />

              {/* Image Details */}
              <div className="p-6">
                <h2 className="text-2xl font-bold gradient-text font-urbanist mb-3">
                  {selectedImage.title}
                </h2>
                
                <p className="text-muted-foreground mb-4">
                  {selectedImage.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedImage.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="outline" className="border-glass-border bg-glass">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Heart className="h-5 w-5 text-red-400" />
                      <span>{selectedImage.likes} likes</span>
                    </div>
                    <span className="text-muted-foreground">by {selectedImage.author}</span>
                    <span className="text-muted-foreground">{selectedImage.date}</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" className="glass-button">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm" className="glass-button">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;