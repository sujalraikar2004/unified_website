import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Team } from '@/lib/api'; // Assuming Team is defined here

// A generic API Error type for Axios errors
interface ApiError {
  response?: {
    data?: {
      error?: string;
    };
  };
  message: string;
}
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface RegisterTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eligibleTeams: Team[];
}

const RegisterTeamModal: React.FC<RegisterTeamModalProps> = ({ isOpen, onClose, eventId, eligibleTeams }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);

  const registerMutation = useMutation<any, ApiError, { eventId: string; teamId: string }>({
    mutationFn: async ({ eventId, teamId }) => {
      const token = localStorage.getItem('uniconnect_token');
      const { data } = await axios.post(
        `https://unified-backend-qxri.onrender.com/api/events/${eventId}/register`,
        { teamId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Team registered successfully!' });
      queryClient.invalidateQueries({ queryKey: ['event', eventId] });
      onClose();
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.error || error.message || 'Failed to register team.';
      toast({ variant: 'destructive', title: 'Error', description: errorMessage });
    },
  });

  const handleRegister = () => {
    if (!selectedTeamId) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please select a team to register.' });
      return;
    }
    registerMutation.mutate({ eventId, teamId: selectedTeamId });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Register a Team for this Event</DialogTitle>
          <DialogDescription>Select one of your teams to register.</DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          {eligibleTeams.length > 0 ? (
            <RadioGroup onValueChange={setSelectedTeamId}>
              <div className="space-y-2">
                {eligibleTeams.map((team) => (
                  <div key={team._id} className="flex items-center space-x-2 border rounded-md p-3">
                    <RadioGroupItem value={team._id} id={team._id} />
                    <Label htmlFor={team._id} className="font-bold text-lg">{team.teamName}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          ) : (
            <p className="text-center text-gray-500">There are no eligible teams to register for this event.</p>
          )}
        </div>

        <DialogFooter>
          <Button type="button" variant="secondary" onClick={onClose} disabled={registerMutation.isPending}>Cancel</Button>
          <Button type="button" onClick={handleRegister} disabled={!selectedTeamId || registerMutation.isPending}>
            {registerMutation.isPending ? 'Registering...' : 'Register Team'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterTeamModal;
