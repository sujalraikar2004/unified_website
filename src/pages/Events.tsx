import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Calendar, MapPin, Users, Clock, ArrowRight, Filter, Search, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import eventsHero from '@/assets/events-hero.jpg';

// Type definition for the event data received from the backend
interface BackendEvent {
  _id: string;
  name: string;
  description: string;
  category: string[];
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxSeats: number;
  registeredTeams: string[];
}

// Type definition for the event data used by the frontend components
interface FrontendEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  category: string;
  status: 'current' | 'upcoming' | 'past';
  description: string;
  tags: string[];
  featured: boolean; // You can enhance this later
}

const fetchEvents = async (): Promise<BackendEvent[]> => {
  const { data } = await axios.get('/api/events');
  return data.data;
};

const Events = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const { data: backendEvents, isLoading, isError } = useQuery<BackendEvent[], Error>({ queryKey: ['events'], queryFn: fetchEvents });

  const events: FrontendEvent[] = useMemo(() => {
    if (!backendEvents) return [];
    return backendEvents.map(event => {
      const eventDate = new Date(event.date);
      const now = new Date();
      let status: 'current' | 'upcoming' | 'past' = 'upcoming';
      if (eventDate < now) {
        status = 'past';
      } 
      // You might want to define 'current' more precisely, e.g., happening today
      if (eventDate.toDateString() === now.toDateString()) {
        status = 'current';
      }

      return {
        id: event._id,
        title: event.name,
        date: event.date,
        time: `${event.startTime} - ${event.endTime}`,
        location: event.location,
        attendees: event.registeredTeams.length,
        maxAttendees: event.maxSeats,
        category: event.category[0] || 'general', // Default to 'general' if no category
        status,
        description: event.description,
        tags: event.category,
        featured: false, // Default value
      };
    });
  }, [backendEvents]);

  const filters = [
    { id: 'all', label: 'All Events', count: events.length },
    { id: 'current', label: 'Current Events', count: events.filter(e => e.status === 'current').length },
    { id: 'upcoming', label: 'Upcoming Events', count: events.filter(e => e.status === 'upcoming').length }
  ];

  const categories = [
    { id: 'workshop', label: 'Workshops', color: 'bg-gradient-primary' },
    { id: 'competition', label: 'Competitions', color: 'bg-gradient-secondary' },
    { id: 'bootcamp', label: 'Bootcamps', color: 'bg-gradient-accent' },
    { id: 'networking', label: 'Networking', color: 'bg-gradient-to-r from-primary to-accent' },
    { id: 'hackathon', label: 'Hackathons', color: 'bg-gradient-to-r from-secondary to-primary' },
    { id: 'general', label: 'General', color: 'bg-gray-500' }
  ];

  const filteredEvents = useMemo(() => events.filter(event => {
    const matchesFilter = activeFilter === 'all' || event.status === activeFilter;
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  }), [events, activeFilter, searchTerm]);

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id.toLowerCase() === category.toLowerCase());
    return cat ? cat.color : 'bg-gradient-primary';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="glass-card animate-pulse">
          <CardHeader className="pb-4">
            <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="flex justify-between items-center pt-4">
              <div className="h-8 bg-muted rounded w-24"></div>
              <div className="h-10 bg-muted rounded w-32"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${eventsHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 to-background/70" />
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text font-urbanist mb-6 animate-fade-in">
            Discover Amazing Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in animate-delay-200">
            Join workshops, competitions, hackathons, and networking events designed to accelerate your growth.
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
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 glass-card border-glass-border"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "default" : "outline"}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`${ 
                    activeFilter === filter.id 
                      ? 'bg-gradient-primary text-white' 
                      : 'glass-button'
                  } transition-all duration-300`}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {filter.label} ({filter.count})
                </Button>
              ))}
            </div>
          </div>

          {/* Events Grid */}
          {isLoading && renderSkeletons()}
          {isError && (
            <div className="text-center py-16 text-red-500">
              <AlertTriangle className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">Failed to load events</h3>
              <p>There was an error fetching the events. Please try again later.</p>
            </div>
          )}
          {!isLoading && !isError && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, index) => (
                <Card 
                  key={event.id}
                  className={`glass-card hover:scale-105 transition-all duration-300 group animate-fade-in ${ 
                    event.featured ? 'ring-2 ring-primary/20 shadow-glow' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className={`${getCategoryColor(event.category)} text-white border-0`}>
                            {categories.find(c => c.id.toLowerCase() === event.category.toLowerCase())?.label}
                          </Badge>
                          {event.featured && (
                            <Badge variant="outline" className="border-accent text-accent">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-foreground group-hover:gradient-text transition-all duration-300 font-urbanist">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2 text-primary" />
                        {formatDate(event.date)}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2 text-secondary" />
                        {event.time}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2 text-accent" />
                        {event.location}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Users className="h-4 w-4 mr-2" />
                          {event.attendees}/{event.maxAttendees} attending
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${ 
                          event.status === 'current' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {event.status === 'current' ? 'Live Now' : 'Upcoming'}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1">
                        {event.tags.map((tag, tagIndex) => (
                          <Badge 
                            key={tagIndex} 
                            variant="outline" 
                            className="text-xs border-glass-border bg-glass"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-4 bg-gradient-primary hover:scale-105 transition-all duration-300"
                      disabled={event.attendees >= event.maxAttendees}
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      {event.attendees >= event.maxAttendees ? 'Event Full' : 'View Details'}
                      {event.attendees < event.maxAttendees && <ArrowRight className="ml-2 h-4 w-4" />}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!isLoading && !isError && filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">No events found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Events;