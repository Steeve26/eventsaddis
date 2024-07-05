import { IEvent } from "@/lib/database/models/event.model"
import EventCard from "./EventCard";

type collectionProps = {
  data: IEvent[],
  emptyTitle: string,
  emptyStateSubtext: string,
  collectionType: "Events_Organized" | "My_Tickets" | "All_Events",
  limit: number,
  page: number | string,
  totalPages?: number,
  urlParamName?: string
}
export default function Collection({data, emptyTitle, emptyStateSubtext, collectionType, limit, page, totalPages = 0, urlParamName}: collectionProps) {
  return (
    <>
      {
        data.length > 0 ?
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10 ">
            {data.map((event, index) => {
              const hasOrderLink = collectionType === 'Events_Organized';
              const hidePrice = collectionType === 'My_Tickets';

              return (
                <li key={event._id} className="">
                  <EventCard event={event} hasOrderLink={hasOrderLink}
                  hidePrice={hidePrice}/>
                </li>
              )
            })}
          </ul>
        </div> :

        <div className="flex-center flex-col gap-3 wrapper min-h-[200px] w-full rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className=" p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className=" p-regular-14">{emptyStateSubtext}</p>
        </div>
      }
    </>
  )
}
