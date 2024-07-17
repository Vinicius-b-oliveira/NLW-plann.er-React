import { Calendar, Tag, X } from "lucide-react";
import { Button } from "../../components/button";
import { FormEvent } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

interface CreateLinkModalProps {
    closeCreateActivityModal: () => void
}

export function CreateLinkModal({
    closeCreateActivityModal
}:CreateLinkModalProps) {

    const { tripId } = useParams()

    async function createLink(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)

        const title = data.get('title')?.toString()
        const url = data.get('url')?.toString()

        await api.post(`/trips/${tripId}/links`, {
            title,
            url
        })

        location.reload()
    }

    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="space-y-2">
                    <div className="flex items-center justify-between">

                        <h2 className="text-lg font-semibold">Cadastrar atividade</h2>

                        <button onClick={closeCreateActivityModal}>
                            <X className="size-5 text-zinc-400" />
                        </button>

                    </div>

                    <p className="text-sm text-zinc-400">
                        Todos convidados podem visualizar as atividades.
                    </p> 
                
                </div>

                <form onSubmit={createLink} className="space-y-3">
                    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                        <Tag className="text-zinc-400 size-5"/>
                        <input 
                        name="title"
                        placeholder="Insira o título do link" 
                        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        /> 
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="h-14 flex-1 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                            <Calendar className="text-zinc-400 size-5"/>
                            <input 
                            type="url"
                            name="url"
                            placeholder="Insira o link" 
                            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                            /> 
                        </div>
                    </div>
                    
                    <Button type="submit" size="full">
                        Salvar link
                    </Button>
                </form>
            </div>
        </div>
    )
}