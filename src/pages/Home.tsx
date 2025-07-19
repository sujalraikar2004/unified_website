import { Link } from 'react-router-dom';
import { ArrowRight, Users, Calendar, Trophy, Zap, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-image.jpg';

const Home = () => {
  const features = [
    {
      icon: Users,
      title: 'Connect & Network',
      description: 'Build meaningful connections with fellow students across different disciplines and universities.',
      gradient: 'from-primary to-primary-glow'
    },
    {
      icon: Calendar,
      title: 'Exclusive Events',
      description: 'Access workshops, seminars, hackathons, and networking events tailored for student growth.',
      gradient: 'from-secondary to-secondary-glow'
    },
    {
      icon: Trophy,
      title: 'Showcase Achievements',
      description: 'Share your projects, certifications, and accomplishments with the vibrant student community.',
      gradient: 'from-accent to-accent-glow'
    },
    {
      icon: Zap,
      title: 'Skill Development',
      description: 'Learn new technologies, improve existing skills, and stay ahead in your academic journey.',
      gradient: 'from-primary to-secondary'
    },
    {
      icon: Globe,
      title: 'Global Community',
      description: 'Connect with students worldwide and expand your academic and professional horizons.',
      gradient: 'from-secondary to-accent'
    },
    {
      icon: Sparkles,
      title: 'Innovation Hub',
      description: 'Collaborate on innovative projects and turn your ideas into reality with like-minded peers.',
      gradient: 'from-accent to-primary'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Students' },
    { number: '500+', label: 'Universities' },
    { number: '1000+', label: 'Events Hosted' },
    { number: '50+', label: 'Countries' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/70 to-background/90" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 float-animation" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-secondary rounded-full opacity-15 float-animation animate-delay-200" />
        <div className="absolute bottom-40 left-20 w-16 h-16 bg-gradient-accent rounded-full opacity-25 float-animation animate-delay-400" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold font-urbanist leading-tight">
              <span className="gradient-text">Unite</span>, <span className="gradient-text">Learn</span>,<br />
              <span className="gradient-text">Grow Together</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in animate-delay-200">
              Join the ultimate student community platform where knowledge meets networking, 
              opportunities meet ambition, and dreams become reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in animate-delay-300">
              <Link to="/signup">
                <Button size="lg" className="bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow text-lg px-8 py-4 glow-pulse">
                  Join Community
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/events">
                <Button size="lg" variant="outline" className="glass-button text-lg px-8 py-4">
                  Explore Events
                  <Calendar className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 animate-fade-in animate-delay-400">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold gradient-text font-urbanist">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold gradient-text font-urbanist mb-6">
              Why Choose Unified Student Community?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the features that make our platform the perfect place for student growth and collaboration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className={`glass-card hover:scale-105 transition-all duration-300 group animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-foreground font-urbanist">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
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
                Ready to Transform Your Student Journey?
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Join thousands of students who are already building their future through meaningful connections and collaborative learning.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow text-lg px-10 py-4">
                    Get Started Today
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Link to="/about">
                  <Button size="lg" variant="outline" className="glass-button text-lg px-10 py-4">
                    Learn More
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;