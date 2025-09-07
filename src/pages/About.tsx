import { Users, Target, Eye, Award, Globe, Heart, BookOpen, TrendingUp, Network, Lightbulb } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const timeline = [
    {
      year: '2021',
      title: 'The Foundation',
      description: 'Founded by Tanish Dumawat, Guruprasad Shirganvi, and Rohit Uppin with a vision to bridge the gap between students\' potential and opportunities. Started by gathering friends and pitching the idea to college principal.',
      icon: Users,
      color: 'from-primary to-primary-glow'
    },
    {
      year: '2021',
      title: 'Official Launch',
      description: 'Secured official permission and formally inaugurated Unified Community. What began as a handful of motivated students quickly grew into a movement.',
      icon: Award,
      color: 'from-secondary to-secondary-glow'
    },
    {
      year: '2022-2023',
      title: 'Rapid Growth',
      description: 'Expanded from 3 founders to a thriving community. Hosted sessions, workshops, and discussions on entrepreneurship, placements, and skill-building.',
      icon: TrendingUp,
      color: 'from-accent to-accent-glow'
    },
    {
      year: '2024',
      title: 'Community Maturity',
      description: 'Built leadership opportunities by passing responsibilities to juniors, ensuring continuity. Created a positive environment where students actively support each other\'s growth.',
      icon: Network,
      color: 'from-primary to-secondary'
    },
    {
      year: '2024',
      title: 'Digital Expansion',
      description: 'Launched our website as a digital home for the community - a hub for connection, learning, and inspiration with dedicated sections for resources, events, and networking.',
      icon: Globe,
      color: 'from-secondary to-accent'
    }
  ];

  const founders = [
    {
      name: 'Tanish Dumawat',
      role: 'Co-Founder',
      description: 'Visionary leader focused on building entrepreneurial mindset and community growth.',
      gradient: 'from-primary to-primary-glow'
    },
    {
      name: 'Guruprasad Shirganvi',
      role: 'Co-Founder',
      description: 'Expert in networking and collaboration, connecting students with opportunities.',
      gradient: 'from-secondary to-secondary-glow'
    },
    {
      name: 'Rohit Uppin',
      role: 'Co-Founder',
      description: 'Specialist in skill development and career guidance for community members.',
      gradient: 'from-accent to-accent-glow'
    }
  ];

  const focusAreas = [
    {
      title: 'Entrepreneurship & Startup Skills',
      description: 'Nurturing a builder\'s mindset and helping students develop entrepreneurial thinking.',
      icon: Lightbulb,
      gradient: 'from-primary to-primary-glow'
    },
    {
      title: 'Networking & Collaboration',
      description: 'Giving students access to peers, mentors, and valuable opportunities.',
      icon: Network,
      gradient: 'from-secondary to-secondary-glow'
    },
    {
      title: 'Skill Development',
      description: 'From English speaking to interview prep, equipping members with practical tools.',
      icon: BookOpen,
      gradient: 'from-accent to-accent-glow'
    },
    {
      title: 'Career Growth',
      description: 'Guiding students with referrals, placements, and real-world exposure.',
      icon: TrendingUp,
      gradient: 'from-primary to-secondary'
    }
  ];

  const stats = [
    { number: '1,500-2,000+', label: 'Active Members', description: 'Growing community of students' },
    { number: '3', label: 'Founding Years', description: 'Since 2021' },
    { number: '100+', label: 'Events Hosted', description: 'Workshops, sessions, and discussions' },
    { number: '∞', label: 'Opportunities', description: 'Unlimited growth potential' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text font-urbanist mb-6 animate-fade-in">
            Unified Community – Our Journey
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
            Founded in 2021 by Tanish Dumawat, Guruprasad Shirganvi, and Rohit Uppin with one simple vision: 
            to bridge the gap between students' potential and the opportunities available to them.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="glass-card p-8 animate-fade-in">
              <CardContent className="space-y-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold gradient-text font-urbanist">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We set out to build a community that focuses on entrepreneurship & startup skills, 
                  networking & collaboration, skill development, and career growth. At the time, we lacked 
                  proper placement support, career guidance, referrals, and most importantly, a structured 
                  way for students to upskill themselves.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card p-8 animate-fade-in animate-delay-200">
              <CardContent className="space-y-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-secondary flex items-center justify-center mb-6">
                  <Eye className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold gradient-text font-urbanist">Our Vision</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The vision for Unified Community goes beyond a college initiative. We're building a 
                  self-sustaining ecosystem where students feel heard, supported, and empowered to grow. 
                  We're creating a long-term network that will continue to guide, inspire, and connect 
                  students and alumni for years to come.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text font-urbanist mb-12 animate-fade-in">
            Meet Our Founders
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <Card 
                key={index} 
                className={`glass-card text-center p-8 hover:scale-105 transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="space-y-4">
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${founder.gradient} flex items-center justify-center mx-auto mb-4`}>
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-urbanist">
                    {founder.name}
                  </h3>
                  <Badge className={`bg-gradient-to-r ${founder.gradient} text-white border-0`}>
                    {founder.role}
                  </Badge>
                  <p className="text-muted-foreground">
                    {founder.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text font-urbanist mb-12 animate-fade-in">
            Our Growth & Impact
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className={`glass-card text-center p-8 hover:scale-105 transition-all duration-300 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="space-y-4">
                  <div className="text-4xl md:text-5xl font-bold gradient-text font-urbanist">
                    {stat.number}
                  </div>
                  <div className="text-xl font-semibold text-foreground">
                    {stat.label}
                  </div>
                  <div className="text-muted-foreground">
                    {stat.description}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text font-urbanist mb-16 animate-fade-in">
            Our Journey
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />

            {/* Timeline Items */}
            <div className="space-y-16">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } animate-fade-in`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Content */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-8' : 'lg:pl-8'}`}>
                    <Card className="glass-card p-6 hover:scale-105 transition-all duration-300">
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          <Badge className={`bg-gradient-to-r ${item.color} text-white border-0`}>
                            {item.year}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-foreground font-urbanist">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Center Dot */}
                  <div className="hidden lg:flex w-2/12 justify-center">
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${item.color} shadow-glow`} />
                  </div>

                  {/* Spacer */}
                  <div className="hidden lg:block w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text font-urbanist mb-12 animate-fade-in">
            What We Focus On
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {focusAreas.map((area, index) => (
              <Card 
                key={index} 
                className={`glass-card text-center p-8 hover:scale-105 transition-all duration-300 group animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="space-y-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${area.gradient} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <area.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-urbanist">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {area.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Website Vision Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="glass-card p-12 animate-fade-in">
            <CardContent className="space-y-8 text-center">
              <h2 className="text-4xl font-bold gradient-text font-urbanist">
                The Website Vision
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                As the community grows, we wanted to build a digital home for Unified Community. 
                Our website serves as a hub for connection, learning, and inspiration.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mx-auto">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground">Founders & Leadership</h4>
                  <p className="text-sm text-muted-foreground">Profiles and Board of Directors archive</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center mx-auto">
                    <Network className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground">Alumni & Networking</h4>
                  <p className="text-sm text-muted-foreground">Connect and collaborate with alumni</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mx-auto">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground">Learning Resources</h4>
                  <p className="text-sm text-muted-foreground">Documents, videos, and curated content</p>
                </div>
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="font-semibold text-foreground">Events & Updates</h4>
                  <p className="text-sm text-muted-foreground">Workshops, sessions, and activities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-card p-12 animate-fade-in">
            <CardContent className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold gradient-text font-urbanist">
                Join Our Growing Community
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Unified Community is not just about today — it's about creating a platform where every 
                student can learn, contribute, and belong. Be part of our journey of transformation.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/signup">
                  <button className="bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow text-lg px-10 py-4 text-white rounded-xl font-semibold">
                    Become a Member
                  </button>
                </a>
                
                <a href="/events">
                  <button className="glass-button text-lg px-10 py-4 rounded-xl font-semibold hover:scale-105 transition-all duration-300">
                    Explore Events
                  </button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;