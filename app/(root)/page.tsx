// "use client"

import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

export default async function Home() {

  const events = await getAllEvents({
    query: '',
    category: '',
    page: 1,
    limit: 6
  })

  console.log(events);
  
  return (
    <main className="min-h-full flex flex-col">
      <section className="bg-gray-200 pb-10">
        <div className="wrapper max-w-fit w-full mx-auto px-3 pt-6 flex items-center justify-between flex-col gap-10 sm:flex-row sm:px-5 md:px-8 ">
          <div className="columns flex flex-col w-full justify-center sm:max-w-[300px] md:max-w-[400px]">
            <h1 className="text-2xl font-bold mb-3 pt-6 capitalize sm:text-3xl md:text-4xl">Host, connect, <br />celebrate: Your events, our platform!</h1>
            <p>Experience the difference that EventsAddis can make. Let us be the platform that elevates your events to new heights of success and joy.</p>
            <Link href="#footer"><Button className="rounded mt-10 w-full lg:w-auto text-lg">Explore now</Button></Link>
          </div>
          <div className="columns flex justify-center">
            <Image src='/assets/images/hero.png' alt="Hero image" width={450} height={200} className="w-full max-w-[unset] md:max-w-[350px]"/>
          </div>
        </div>
      </section>

      <section id="events" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold capitalize">trusted by <br /> thousands of events </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row ">
          Search
          CategoryFilter
        </div>

        <Collection 
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Please come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>

    </main>
  )
}
