import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, UserPlus, Book, Building, Hash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

import { useAuth } from '@/contexts/AuthContext';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    usn: '',
    semester: '',
    department: '',
  });
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      toast({
        title: 'Terms Required',
        description: 'Please agree to the terms and conditions to continue.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    const signupData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      usn: formData.usn,
      semester: Number(formData.semester),
      department: formData.department,
    };

    try {
      const response = await fetch('https://unified-backend-0z4c.onrender.com/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Use the error message from the backend if available
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      toast({
        title: 'Activation Email Sent!',
        description: data.message || 'Please check your email to activate your account.',
      });

      navigate('/check-email');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
      toast({
        title: 'Signup Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md glass-card animate-fade-in">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold gradient-text font-urbanist">
              Join UniConnect
            </CardTitle>
            <p className="text-muted-foreground">
              Create your account and start connecting
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="pl-10 glass-card border-glass-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="pl-10 glass-card border-glass-border"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="usn">USN</Label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="usn"
                      type="text"
                      placeholder="Your USN"
                      value={formData.usn}
                      onChange={(e) => handleInputChange('usn', e.target.value)}
                      className="pl-10 glass-card border-glass-border"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="semester">Semester</Label>
                  <div className="relative">
                    <Book className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="semester"
                      type="number"
                      placeholder="e.g. 5"
                      value={formData.semester}
                      onChange={(e) => handleInputChange('semester', e.target.value)}
                      className="pl-10 glass-card border-glass-border"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="department"
                    type="text"
                    placeholder="Your Department"
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className="pl-10 glass-card border-glass-border"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="pl-10 pr-10 glass-card border-glass-border"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeToTerms}
                  onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:scale-105 transition-all duration-300 shadow-glow"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account
                  </>
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center items-center text-center p-12 text-white">
          <h1 className="text-5xl font-bold font-urbanist mb-6">
            Start Your Journey
          </h1>
          <p className="text-xl opacity-90 max-w-md leading-relaxed mb-12">
            Join thousands of students building their future through UniConnect.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
