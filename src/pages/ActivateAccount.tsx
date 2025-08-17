import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/lib/api';

const ActivateAccount = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const activate = async () => {
      if (!token) {
        toast({
          title: 'Activation Failed',
          description: 'No activation token found in the URL.',
          variant: 'destructive',
        });
        navigate('/login');
        return;
      }

      try {
        const response = await apiClient.get(`/api/users/activate/${token}`);
        toast({
          title: 'Account Activated!',
          description: 'Your account is now active. Please log in to continue.',
        });
        setTimeout(() => navigate('/login'), 2000);
      } catch (error: any) {
        toast({
          title: 'Activation Failed',
          description: error.message || 'The activation link is invalid or has expired.',
          variant: 'destructive',
        });
        navigate('/login');
      }
    };

    activate();
  }, [token, navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Activating Your Account</h1>
        <p className="text-gray-600">Please wait a moment...</p>
      </div>
    </div>
  );
};

export default ActivateAccount;
