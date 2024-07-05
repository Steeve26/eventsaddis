import EventForm from "@/components/shared/EventForm"
import { getEventById } from "@/lib/actions/event.actions"
import { auth } from "@clerk/nextjs/server"

type updateEventProps = {
  params: {
    id: string
  }
}
export default async function UpdateEvent({ params: {id}}: updateEventProps) {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string

  const event = await getEventById(id)
  
  return (
    <main className="flex-grow">
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center capitalize sm:text-left">update event</h3>
      </section>
    
      <div className="wrapper my-8">
        <EventForm userId={userId} type="Update" event={event} eventId={event._id}/>
      </div>
    </main>
  )
}
