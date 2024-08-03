import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventById, getEventsByUser } from "@/lib/actions/event.actions";
import { getOrdersByEvent, getOrdersByUser } from "@/lib/actions/order.actions";
import { IEvent } from "@/lib/database/models/event.model";
import { IOrder } from "@/lib/database/models/order.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { HiOutlinePlus } from "react-icons/hi";

export default async function Profile({ searchParams }: SearchParamProps) {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage || 1)
  const eventsPage = Number(searchParams?.eventsPage || 1)

  const orders = await getOrdersByUser({userId, page: ordersPage})
  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || []

  const organizedEvents = await getEventsByUser({userId, page: eventsPage})

  console.log(orderedEvents);
  
  
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
        <Collection 
          data={orderedEvents}
          emptyTitle="No event tickets purchased yet."
          emptyStateSubtext="Explore our most exciting events!"
          collectionType="My_Tickets"
          limit={3}
          page={ordersPage}
          urlParamName="ordersPage"
          totalPages={orders?.totalPages}
        />
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
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={organizedEvents?.totalPages}
        />
      </section>
    </main>
  )
}
