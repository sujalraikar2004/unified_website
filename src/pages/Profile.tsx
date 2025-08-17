import { useEffect, useState } from 'react';


import { User as AuthUser } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User as UserIcon, Loader2, AlertCircle } from 'lucide-react';

const Profile = () => {
  const [profile, setProfile] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('uniconnect_token');
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/users/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch profile.');
        }

        const data = await response.json();
        setProfile(data);
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 flex items-center space-x-2 p-4 bg-red-500/10 rounded-lg">
          <AlertCircle className="h-6 w-6" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return <div>No profile data found.</div>;
  }

  return (
    <div className="min-h-screen container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="max-w-2xl mx-auto glass-card animate-fade-in">
        <CardHeader className="text-center">
          <div className="inline-block bg-gradient-primary p-4 rounded-full mx-auto mb-4">
            <UserIcon className="h-12 w-12 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold gradient-text font-urbanist">
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-lg">Full Name:</p>
              <p className="text-muted-foreground">{profile.fullName}</p>
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-lg">Email:</p>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
            {profile.usn && (
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-lg">USN:</p>
                <p className="text-muted-foreground">{profile.usn}</p>
              </div>
            )}
            {profile.department && (
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-lg">Department:</p>
                <p className="text-muted-foreground">{profile.department}</p>
              </div>
            )}
            {profile.semester && (
              <div className="flex flex-col space-y-1">
                <p className="font-semibold text-lg">Semester:</p>
                <p className="text-muted-foreground">{profile.semester}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
