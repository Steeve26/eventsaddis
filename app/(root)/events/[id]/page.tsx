import { getEventById } from "@/lib/actions/event.actions"
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types"
import Image from "next/image"
import { IoCalendar } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import Link from "next/link";

export default async function eventDetails( {params: {id}}: SearchParamProps) {
  const event = await getEventById(id)

  return (
    <main className="flex-grow flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
      <div className="wrapper grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
        <Image className="h-full rounded max-h-[350px] md:max-h-[80%] object-cover object-center" src={event.imageUrl} alt="event image" 
        width={1000} height={1000}/>
        
        <div className="flex w-full flex-col gap-8 p-5 md:p-10">
          <div className="flex flex-col gap-6">
            <h2 className="h2-bold ">{event.title}</h2>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex gap-3">
                <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                  {event.isFree ? 'FREE' : event.price}
                </p>

                <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500
                  flex items-center">
                  {event.category.name}
                </p>
              </div>

              <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                <span className="text-primary-500 capitalize">by {event.organizer.firstName} {event.organizer.lastname}</span>
              </p>
            </div>
          </div>

          {/* CHECKOUT BUTTON */}

          <div className="flex flex-col gap-5">
            <div className="flex gap-2 md:gap-3">
              <div className="flex items-center">
                <IoCalendar size={24} color="#ff4300"/>
              </div>
              <div className="flex flex-col ml-4">
                <p>
                  {formatDateTime(event.startDateTime).dateOnly} - {' '}
                  {formatDateTime(event.startDateTime).timeOnly}
                </p>
                <p>
                  {formatDateTime(event.endDateTime).dateOnly} - {' '}
                  {formatDateTime(event.endDateTime).timeOnly}
                </p>
              </div>
            </div>

              <div className="p-regular-20 flex items-center gap-3">
                <FaLocationDot size={24} color="#ff4300"/>
                <p className=" p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600 capitalize"> what to expect.</p>
              <p className=" p-medium-16 lg:p-regular-18">{event.description}</p>
              <div className="flex gap-3 items-center">
                <FaLink size={24} color="#ff4300"/>              
                <Link href={event.url} target="_blank">
                  <p className=" p-medium-16 lg:p-regular-18 truncate text-primary-500">{event.url}</p>
                </Link>
              </div>
            </div>
          </div>

        </div>
    </main>
  )
}

