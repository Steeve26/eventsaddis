import EventForm from "@/components/shared/EventForm"
import { auth } from "@clerk/nextjs/server"

export default function CreateEvent() {
  const { sessionClaims } = auth()
  const userId = sessionClaims?.userId as string

  return (
    <main className="flex-grow">
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center capitalize sm:text-left">create event</h3>
      </section>
    
      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create"/>
      </div>
    </main>
  )
}
