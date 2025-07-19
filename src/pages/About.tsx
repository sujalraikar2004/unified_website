import { Users, Target, Eye, Award, Globe, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const About = () => {
  const timeline = [
    {
      year: '2019',
      title: 'The Beginning',
      description: 'Founded with a vision to connect students globally and create a unified learning community.',
      icon: Users,
      color: 'from-primary to-primary-glow'
    },
    {
      year: '2020',
      title: 'Digital Transformation',
      description: 'Adapted to the digital age with virtual events and online collaboration tools during the pandemic.',
      icon: Globe,
      color: 'from-secondary to-secondary-glow'
    },
    {
      year: '2021',
      title: 'Global Expansion',
      description: 'Reached 100+ universities across 25 countries, establishing international partnerships.',
      icon: Award,
      color: 'from-accent to-accent-glow'
    },
    {
      year: '2022',
      title: 'Innovation Hub',
      description: 'Launched our innovation lab and accelerator program for student startups and projects.',
      icon: Target,
      color: 'from-primary to-secondary'
    },
    {
      year: '2023',
      title: 'Community Growth',
      description: 'Surpassed 10,000 active members and hosted over 500 successful events worldwide.',
      icon: Heart,
      color: 'from-secondary to-accent'
    },
    {
      year: '2024',
      title: 'Future Forward',
      description: 'Continuing to innovate with AI-powered networking and personalized learning experiences.',
      icon: Eye,
      color: 'from-accent to-primary'
    }
  ];

  const values = [
    {
      title: 'Inclusivity',
      description: 'We welcome students from all backgrounds, disciplines, and skill levels to join our community.',
      icon: Users,
      gradient: 'from-primary to-primary-glow'
    },
    {
      title: 'Innovation',
      description: 'We encourage creative thinking and provide platforms for students to turn ideas into reality.',
      icon: Target,
      gradient: 'from-secondary to-secondary-glow'
    },
    {
      title: 'Collaboration',
      description: 'We believe in the power of working together to achieve greater success and learning outcomes.',
      icon: Heart,
      gradient: 'from-accent to-accent-glow'
    },
    {
      title: 'Growth',
      description: 'We are committed to continuous learning and personal development for every community member.',
      icon: Award,
      gradient: 'from-primary to-secondary'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Students', description: 'From universities worldwide' },
    { number: '500+', label: 'Universities', description: 'Across 50+ countries' },
    { number: '1,000+', label: 'Events Hosted', description: 'Workshops, hackathons, and more' },
    { number: '95%', label: 'Satisfaction Rate', description: 'Member satisfaction score' }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold gradient-text font-urbanist mb-6 animate-fade-in">
            About Unified Student Community
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
            Empowering students worldwide through meaningful connections, collaborative learning, 
            and innovative opportunities that shape the future of education.
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
                  To create a unified platform where students from diverse backgrounds can connect, 
                  collaborate, and grow together. We aim to bridge the gap between theoretical knowledge 
                  and practical experience through hands-on projects, networking opportunities, and 
                  skill development programs.
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
                  To become the world's leading student community platform that transcends geographical 
                  boundaries and institutional barriers. We envision a future where every student has 
                  access to global opportunities, mentorship, and resources needed to achieve their 
                  academic and professional goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text font-urbanist mb-12 animate-fade-in">
            Our Impact in Numbers
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

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center gradient-text font-urbanist mb-12 animate-fade-in">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className={`glass-card text-center p-8 hover:scale-105 transition-all duration-300 group animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="space-y-4">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground font-urbanist">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
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
                Be part of a movement that's reshaping how students connect, learn, and grow together. 
                Your journey of transformation starts here.
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