import { CircleCheck, CircleDashed } from "lucide-react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale'

interface Activity {
    date: string
    activities: {
        id: string
        title: string
        occurs_at: string
    }[]
}

export function Activities() {

    const {tripId} = useParams()
    const [activities, setActivities] = useState<Activity[]>([])
    const [clickedActivities, setClickedActivities] = useState<string[]>(() => {
        const saved = localStorage.getItem('clickedActivities');
        return saved ? JSON.parse(saved) : [];
      });
    
      const handleIconClick = (activityId: string) => {
        setClickedActivities((prev) => {
          const updated = prev.includes(activityId)
            ? prev.filter(id => id !== activityId)
            : [...prev, activityId];
          localStorage.setItem('clickedActivities', JSON.stringify(updated));
          return updated;
        });
      };

    useEffect(() => {
        api.get(`/trips/${tripId}/activities`)
            .then(response => setActivities(response.data.activities))
    }, [tripId])



    return(
        <div className="space-y-8">

            {activities.map((category, index) => {
                return (
                    <div key={index} className="space-y-2.5">
                        <div className="flex gap-2 items-baseline">
                            <span className="text-xl text-zinc-300 font-semibold">Dia {format(category.date, 'd')}</span>
                            <span className="text-xs text-zinc-500">{format(category.date, 'EEEE', { locale: ptBR })}</span>
                        </div>

                       {category.activities.length > 0 ? (
                        <div>
                            {category.activities.map(activity => {
                                return (
                                    <div key={activity.id} className="space-y-2.5">
                                        <div 
                                            className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3 cursor-pointer"
                                            onClick={() => handleIconClick(activity.id)}
                                        >
                                            {clickedActivities.includes(activity.id) ? (
                                                <CircleCheck className="size-5 text-lime-300" />
                                            ) : (
                                                <CircleDashed className="size-5 text-zinc-300" />
                                            )}
                                            
                                            <span className="text-zinc-100">{activity.title}</span>
                                            <span className="text-zinc-400 text-sm ml-auto">
                                                {format(activity.occurs_at, 'HH:mm')}h
                                            </span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                       ) : (
                        <p className="text-zinc-500 text-sm">Nenhuma atividade cadastrada.</p>
                       )}
                    </div>
                )
            })}
        </div>
    )
}