import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Team } from '@/lib/api'; // Assuming Team type is defined here

// Define the Event type locally if not available from a shared lib
export interface Event {
  _id: string;
  name: string;
  description: string;
  category: string[];
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  maxSeats: number;
  seatsAvailable: number;
  registeredTeams: Team[];
}
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RegisterTeamModal from '@/components/events/RegisterTeamModal';
import { useAuth } from '@/contexts/AuthContext';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);

  const { data: event, isLoading: isEventLoading, error: eventError } = useQuery<Event, Error>({
    queryKey: ['event', id],
    queryFn: async () => {
      const { data } = await axios.get(`https://unified-backend-qxri.onrender.com/api/events/${id}`);
      return data.data;
    },
    enabled: !!id,
  });

  const { data: myTeams, isLoading: areMyTeamsLoading } = useQuery<Team[], Error>({
    queryKey: ['myTeams'],
    queryFn: async () => {
      const token = localStorage.getItem('uniconnect_token');
      const { data } = await axios.get('/api/teams', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return data.data;
    },
    enabled: !!user, // Only fetch teams if user is logged in
  });

  const userIsTeamLeader = useMemo(() => {
    return myTeams && myTeams.some(team => team.teamLeader._id === user?._id);
  }, [myTeams, user]);

  const registeredTeamIds = useMemo(() => {
    return event?.registeredTeams.map(team => team._id) || [];
  }, [event]);

  const eligibleTeamsForRegistration = useMemo(() => {
    if (!myTeams) return [];
    return myTeams.filter(team => !registeredTeamIds.includes(team._id));
  }, [myTeams, registeredTeamIds]);

  if (isEventLoading || areMyTeamsLoading) {
    return <div className="container mx-auto p-4">Loading event details...</div>;
  }

  if (eventError) {
    return <div className="container mx-auto p-4 text-red-500">Error: {eventError.message}</div>;
  }

  if (!event) {
    return <div className="container mx-auto p-4">Event not found.</div>;
  }

  const canRegister = user && userIsTeamLeader && event.seatsAvailable > 0 && eligibleTeamsForRegistration.length > 0;

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <div>
              <CardTitle className="text-3xl font-bold mb-2">{event.name}</CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  <span>{event.startTime} - {event.endTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            {canRegister && (
              <Button onClick={() => setRegisterModalOpen(true)} className="mt-4 sm:mt-0">
                Register Your Team
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-muted-foreground">{event.description}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Registered Teams ({event.registeredTeams?.length || 0} / {event.maxSeats})</CardTitle>
            </CardHeader>
            <CardContent>
              {event.registeredTeams && event.registeredTeams.length > 0 ? (
                <ul className="space-y-4">
                  {event.registeredTeams.map(team => team && (
                    <li key={team._id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Trophy className="h-6 w-6 text-primary" />
                        <span className="font-semibold">{team.teamName}</span>
                      </div>
                      <Badge variant="secondary">{team.members?.length ? team.members.length + 1 : 1} members</Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No teams have registered yet. Be the first!</p>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>{event.seatsAvailable} seats available</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.category.map(cat => (
                  <Badge key={cat} variant="outline">{cat}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {canRegister && (
        <RegisterTeamModal
          isOpen={isRegisterModalOpen}
          onClose={() => setRegisterModalOpen(false)}
          eventId={event._id}
          eligibleTeams={eligibleTeamsForRegistration}
        />
      )}
    </div>
  );
};

export default EventDetail;