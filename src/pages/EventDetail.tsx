import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Users, Clock, ArrowLeft, User, Mail, Phone, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    year: '',
    department: '',
    experience: '',
    expectations: ''
  });

  // Mock event data - in real app, this would come from an API
  const events = [
    {
      id: 1,
      title: 'AI & Machine Learning Workshop',
      date: '2024-01-25',
      time: '2:00 PM - 5:00 PM',
      location: 'Tech Hub, Room 301',
      attendees: 45,
      maxAttendees: 60,
      category: 'workshop',
      status: 'upcoming',
      description: 'Hands-on workshop covering fundamentals of AI and practical ML implementations.',
      fullDescription: 'Join us for an intensive 3-hour workshop where you\'ll dive deep into the world of Artificial Intelligence and Machine Learning. This hands-on session is designed for students who want to understand the practical applications of AI in today\'s technology landscape.',
      agenda: [
        '2:00 PM - Welcome & Introduction to AI concepts',
        '2:30 PM - Understanding Machine Learning algorithms',
        '3:15 PM - Break',
        '3:30 PM - Hands-on coding session with Python',
        '4:30 PM - Real-world project examples',
        '5:00 PM - Q&A and networking'
      ],
      prerequisites: [
        'Basic programming knowledge (Python preferred)',
        'Laptop with Python 3.7+ installed',
        'Enthusiasm to learn!'
      ],
      outcomes: [
        'Understanding of AI/ML fundamentals',
        'Hands-on experience with ML libraries',
        'Portfolio project to showcase',
        'Certificate of completion'
      ],
      speakers: [
        {
          name: 'Dr. Sarah Chen',
          role: 'AI Research Scientist',
          company: 'TechCorp Innovation Lab'
        },
        {
          name: 'Mark Johnson',
          role: 'Senior ML Engineer',
          company: 'DataFlow Solutions'
        }
      ],
      tags: ['AI', 'Machine Learning', 'Python'],
      featured: true
    },
    {
      id: 2,
      title: 'Student Startup Pitch Competition',
      date: '2024-01-20',
      time: '6:00 PM - 9:00 PM',
      location: 'Innovation Center',
      attendees: 120,
      maxAttendees: 150,
      category: 'competition',
      status: 'current',
      description: 'Present your startup ideas to industry experts and win exciting prizes.',
      fullDescription: 'The ultimate platform for student entrepreneurs to showcase their innovative ideas! Present your startup concept to a panel of industry experts, successful entrepreneurs, and potential investors.',
      agenda: [
        '6:00 PM - Registration & Welcome',
        '6:30 PM - Keynote: "Building the Future"',
        '7:00 PM - Pitch Presentations (3 min each)',
        '8:00 PM - Judges Deliberation',
        '8:30 PM - Awards Ceremony',
        '9:00 PM - Networking Session'
      ],
      prerequisites: [
        'Original startup idea or business concept',
        '3-minute pitch presentation',
        'Business model overview',
        'Team of 1-4 members'
      ],
      outcomes: [
        'Cash prizes up to $5,000',
        'Mentorship opportunities',
        'Investor connections',
        'Media coverage'
      ],
      speakers: [
        {
          name: 'Alex Rivera',
          role: 'Startup Founder',
          company: 'InnovateTech (Sold for $50M)'
        }
      ],
      tags: ['Entrepreneurship', 'Startup', 'Competition'],
      featured: true
    },
    {
      id: 3,
      title: 'Student Startup Pitch Competition',
      date: '2024-01-20',
      time: '6:00 PM - 9:00 PM',
      location: 'Innovation Center',
      attendees: 120,
      maxAttendees: 150,
      category: 'competition',
      status: 'current',
      description: 'Present your startup ideas to industry experts and win exciting prizes.',
      fullDescription: 'The ultimate platform for student entrepreneurs to showcase their innovative ideas! Present your startup concept to a panel of industry experts, successful entrepreneurs, and potential investors.',
      agenda: [
        '6:00 PM - Registration & Welcome',
        '6:30 PM - Keynote: "Building the Future"',
        '7:00 PM - Pitch Presentations (3 min each)',
        '8:00 PM - Judges Deliberation',
        '8:30 PM - Awards Ceremony',
        '9:00 PM - Networking Session'
      ],
      prerequisites: [
        'Original startup idea or business concept',
        '3-minute pitch presentation',
        'Business model overview',
        'Team of 1-4 members'
      ],
      outcomes: [
        'Cash prizes up to $5,000',
        'Mentorship opportunities',
        'Investor connections',
        'Media coverage'
      ],
      speakers: [
        {
          name: 'Alex Rivera',
          role: 'Startup Founder',
          company: 'InnovateTech (Sold for $50M)'
        }
      ],
      tags: ['Entrepreneurship', 'Startup', 'Competition'],
      featured: true
    }
  ];

  const event = events.find(e => e.id === parseInt(id || '0'));

  if (!event) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Event Not Found</h2>
          <Button onClick={() => navigate('/events')} className="bg-gradient-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    
    // Simulate registration process
    setTimeout(() => {
      toast({
        title: "Registration Successful!",
        description: "You've been registered for the event. Check your email for confirmation.",
      });
      setIsRegistering(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        studentId: '',
        year: '',
        department: '',
        experience: '',
        expectations: ''
      });
    }, 2000);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric',
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      workshop: 'bg-gradient-primary',
      competition: 'bg-gradient-secondary',
      bootcamp: 'bg-gradient-accent',
      networking: 'bg-gradient-to-r from-primary to-accent',
      hackathon: 'bg-gradient-to-r from-secondary to-primary'
    };
    return colors[category as keyof typeof colors] || 'bg-gradient-primary';
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <Button 
          onClick={() => navigate('/events')}
          variant="outline"
          className="mb-6 glass-button"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Events
        </Button>

        {/* Event Header */}
        <Card className="glass-card mb-8">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={`${getCategoryColor(event.category)} text-white border-0`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </Badge>
                  {event.featured && (
                    <Badge variant="outline" className="border-accent text-accent">
                      Featured
                    </Badge>
                  )}
                  <div className={`text-xs px-3 py-1 rounded-full ${
                    event.status === 'current' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {event.status === 'current' ? 'Live Now' : 'Upcoming'}
                  </div>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold gradient-text font-urbanist mb-4">
                  {event.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  {event.fullDescription}
                </p>
              </div>
            </div>

            {/* Event Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-3">
                <div className="flex items-center text-foreground">
                  <Calendar className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium">{formatDate(event.date)}</span>
                </div>
                <div className="flex items-center text-foreground">
                  <Clock className="h-5 w-5 mr-3 text-secondary" />
                  <span className="font-medium">{event.time}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-foreground">
                  <MapPin className="h-5 w-5 mr-3 text-accent" />
                  <span className="font-medium">{event.location}</span>
                </div>
                <div className="flex items-center text-foreground">
                  <Users className="h-5 w-5 mr-3 text-primary" />
                  <span className="font-medium">{event.attendees}/{event.maxAttendees} registered</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Event Agenda */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Event Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-glass border border-glass-border">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Speakers */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Speakers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-glass border border-glass-border">
                      <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground">{speaker.name}</h4>
                        <p className="text-sm text-muted-foreground">{speaker.role}</p>
                        <p className="text-xs text-accent">{speaker.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Learning Outcomes */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">What You'll Gain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {event.outcomes.map((outcome, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                      <span className="text-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-foreground">Join This Event</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {event.maxAttendees - event.attendees} spots left
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {event.attendees} already registered
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300"
                      disabled={event.attendees >= event.maxAttendees}
                    >
                      {event.attendees >= event.maxAttendees ? 'Event Full' : 'Participate Now'}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Register for {event.title}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="glass-card"
                          />
                        </div>
                        <div>
                          <Label htmlFor="studentId">Student ID *</Label>
                          <Input
                            id="studentId"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleInputChange}
                            required
                            className="glass-card"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="glass-card"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="glass-card"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="year">Academic Year *</Label>
                          <Input
                            id="year"
                            name="year"
                            placeholder="e.g., 2nd Year"
                            value={formData.year}
                            onChange={handleInputChange}
                            required
                            className="glass-card"
                          />
                        </div>
                        <div>
                          <Label htmlFor="department">Department *</Label>
                          <Input
                            id="department"
                            name="department"
                            placeholder="e.g., Computer Science"
                            value={formData.department}
                            onChange={handleInputChange}
                            required
                            className="glass-card"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="experience">Relevant Experience</Label>
                        <Textarea
                          id="experience"
                          name="experience"
                          placeholder="Tell us about your background in this area..."
                          value={formData.experience}
                          onChange={handleInputChange}
                          className="glass-card"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label htmlFor="expectations">What do you hope to achieve?</Label>
                        <Textarea
                          id="expectations"
                          name="expectations"
                          placeholder="What are your goals for this event?"
                          value={formData.expectations}
                          onChange={handleInputChange}
                          className="glass-card"
                          rows={3}
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-primary"
                        disabled={isRegistering}
                      >
                        {isRegistering ? 'Registering...' : 'Complete Registration'}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>

            {/* Prerequisites */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Prerequisites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {event.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <GraduationCap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-foreground">{prereq}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="border-glass-border bg-glass"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;