import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Team } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { PlusCircle, Users, Trash2, Edit } from 'lucide-react';
import CreateTeamModal from '@/components/teams/CreateTeamModal';
import UpdateTeamModal from '@/components/teams/UpdateTeamModal';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';

const MyTeams: React.FC = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: teams, isLoading, isError, error } = useQuery<Team[], Error>({
    queryKey: ['myTeams'],
    queryFn: async () => {
      const token = localStorage.getItem('uniconnect_token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }
      const response = await fetch('https://unified-backend-qxri.onrender.com/api/teams', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch teams.');
      }
      const responseData = await response.json();
      return responseData.data;
    },
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (teamId) => {
      const token = localStorage.getItem('uniconnect_token');
      if (!token) {
        throw new Error('Authentication token not found.');
      }
      const response = await fetch(`https://unified-backend-qxri.onrender.com/api/teams/${teamId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete team.');
      }
    },
    onSuccess: () => {
      toast({ title: 'Success', description: 'Team deleted successfully.' });
      queryClient.invalidateQueries({ queryKey: ['myTeams'] });
      setTeamToDelete(null);
    },
    onError: (error: Error) => {
      toast({ variant: 'destructive', title: 'Error', description: error.message });
      setTeamToDelete(null);
    },
  });

  const handleTeamCreated = () => {
    setCreateModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ['myTeams'] });
  };

  const handleEditClick = (team: Team) => {
    setTeamToEdit(team);
    setUpdateModalOpen(true);
  };

  const handleDeleteClick = (team: Team) => {
    setTeamToDelete(team);
  };

  const confirmDelete = () => {
    if (teamToDelete) {
      deleteMutation.mutate(teamToDelete._id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Teams</h1>
        <Button onClick={() => setCreateModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Team
        </Button>
      </div>

      <CreateTeamModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setCreateModalOpen(false)} 
        onTeamCreated={handleTeamCreated} 
      />

      <UpdateTeamModal 
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setUpdateModalOpen(false);
          setTeamToEdit(null);
        }}
        team={teamToEdit}
      />

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 shadow-sm animate-pulse">
              <div className="h-6 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-muted rounded w-1/2 mb-6"></div>
              <div className="flex justify-end gap-2 mt-4">
                <div className="h-10 w-10 bg-muted rounded"></div>
                <div className="h-10 w-10 bg-muted rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg border-destructive/50 bg-destructive/10">
          <h2 className="text-xl font-semibold text-destructive">Error Fetching Teams</h2>
          <p className="text-destructive/80 mt-2 mb-4">{error.message}</p>
          <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['myTeams'] })}>Try Again</Button>
        </div>
      ) : teams && teams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
            <div key={team._id} className="border rounded-lg p-4 shadow-sm flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{team.teamName}</h2>
                <div className="flex items-center text-gray-500 mb-4">
                  <Users className="mr-2 h-4 w-4" />
                  <span>{team.members.length} Members</span>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="icon" onClick={() => handleEditClick(team)}><Edit className="h-4 w-4" /></Button>
                <Button variant="destructive" size="icon" onClick={() => handleDeleteClick(team)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">No teams found</h2>
          <p className="text-gray-500 mt-2 mb-4">Get started by creating your first team.</p>
          <Button onClick={() => setCreateModalOpen(true)}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create a Team
          </Button>
        </div>
      )}

      <AlertDialog open={!!teamToDelete} onOpenChange={() => setTeamToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the team "{teamToDelete?.teamName}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyTeams;
