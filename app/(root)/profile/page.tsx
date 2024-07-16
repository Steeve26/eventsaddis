import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventById, getEventsByUser } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { HiOutlinePlus } from "react-icons/hi";

export default async function Profile() {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({userId, page: 1})
  
  return (
    <main className=" flex-grow">
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild className="button hidden sm:flex">
            <Link href="/#events">Explore New Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        {/* <Collection 
          data={events?.data}
          emptyTitle="No event tickets purchased yet."
          emptyStateSubtext="Explore our most exciting events!"
          collectionType="My_Tickets"
          limit={3}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        /> */}
      </section>

      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Events Organized</h3>
          <Button asChild className="button hidden sm:flex">
            <Link className="flex gap-2" href="/events/create">Create New Event <HiOutlinePlus size={20} /></Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection 
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet."
          emptyStateSubtext="Create you first event!"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          urlParamName="eventsPage"
          totalPages={2}
        />
      </section>
    </main>
  )
}
