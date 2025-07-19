import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Linkedin, Instagram, Github } from 'lucide-react';
import unifiedLogo from '@/assets/unified-student-community-logo.png';

const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'About', href: '/about' },
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/company/unified-student-community',
      icon: Linkedin,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/unified_student_community',
      icon: Instagram,
      color: 'hover:text-pink-600'
    },
    {
      name: 'Gmail',
      href: 'mailto:contact@uni.edu',
      icon: Mail,
      color: 'hover:text-red-600'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/unified-student-community',
      icon: Github,
      color: 'hover:text-gray-600'
    }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ];

  return (
    <footer className="bg-gradient-to-br from-background via-muted/20 to-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={unifiedLogo} 
                alt="Unified Student Community" 
                className="h-10 w-10"
              />
              <span className="text-xl font-bold gradient-text font-urbanist">
                Unified Student Community
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              Advancing AI literacy, fostering innovation, and building a community of future AI leaders through education, collaboration, and research.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg glass-card transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  <p>123 AI Campus, Tech Hub</p>
                  <p>Computer Science Building</p>
                  <p>University Town, TX 75001</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href="tel:+12345678900"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  +1 (234) 567-890
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <a 
                  href="mailto:contact@uni.edu"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                >
                  contact@uni.edu
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2025 Unified Student Community. All rights reserved.
            </p>
            
            <div className="flex space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm hover:underline"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
