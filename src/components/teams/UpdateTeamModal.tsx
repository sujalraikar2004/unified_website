import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { teamApi, UpdateTeamRequest, Team, ApiError } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Trash2 } from 'lucide-react';

const teamMemberSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  usn: z.string().min(1, 'USN is required'),
  currentSemester: z.coerce.number().min(1).max(8),
  department: z.string().min(1, 'Department is required'),
});

const formSchema = z.object({
  teamName: z.string().min(3, 'Team name must be at least 3 characters'),
  members: z.array(teamMemberSchema).min(2, 'A team must have at least 2 members').max(3, 'A team can have a maximum of 3 members'),
});

interface UpdateTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  team: Team | null;
}

const UpdateTeamModal: React.FC<UpdateTeamModalProps> = ({ isOpen, onClose, team }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamName: '',
      members: [],
    },
  });

  useEffect(() => {
    if (team) {
      form.reset({
        teamName: team.teamName,
        members: team.members.map(({ fullName, usn, currentSemester, department }) => ({ fullName, usn, currentSemester, department }))
      });
    }
  }, [team, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'members',
  });

  const updateMutation = useMutation<any, ApiError, { teamId: string; teamData: UpdateTeamRequest }>({
    mutationFn: teamApi.updateTeam,
    onSuccess: () => {
      toast({ title: 'Success', description: 'Team updated successfully!' });
      queryClient.invalidateQueries({ queryKey: ['myTeams'] });
      onClose();
    },
    onError: (error) => {
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Failed to update team.' });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (!team) return;
    updateMutation.mutate({ teamId: team._id, teamData: values as UpdateTeamRequest });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Team</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="teamName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Team Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., The Code Crusaders" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div>
              <h3 className="text-lg font-medium mb-2">Team Members</h3>
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="grid grid-cols-2 gap-4 border p-4 rounded-md relative">
                    <FormField control={form.control} name={`members.${index}.fullName`} render={({ field }) => <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name={`members.${index}.usn`} render={({ field }) => <FormItem><FormLabel>USN</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name={`members.${index}.currentSemester`} render={({ field }) => <FormItem><FormLabel>Semester</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>} />
                    <FormField control={form.control} name={`members.${index}.department`} render={({ field }) => <FormItem><FormLabel>Department</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                    <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => remove(index)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" className="mt-4" onClick={() => append({ fullName: '', usn: '', currentSemester: 1, department: '' })}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>

            <DialogFooter>
              <Button type="button" variant="secondary" onClick={onClose} disabled={updateMutation.isPending}>Cancel</Button>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTeamModal;
