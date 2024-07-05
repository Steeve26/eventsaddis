"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import { HiLink } from "react-icons/hi";
import { FaDollarSign } from "react-icons/fa";
import { Input } from "@/components/ui/input"
import { eventFormSchema } from "@/lib/validator"
import * as z from "zod"
import { eventDefaultValues } from "@/constants"
import DropDown from "./DropDown"
import { Textarea } from "../ui/textarea"
import { FileUploader } from "./FileUploader"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { useRouter } from "next/navigation"
import { useUploadThing } from "@/lib/uploadthing"
import { createEvent, updateEvent } from "@/lib/actions/event.actions"
import { IEvent } from "@/lib/database/models/event.model"
import Category from "@/lib/database/models/category.model"

type EventFormProps = {
  userId: string,
  type: "Create" | "Update",
  event?: IEvent,
  eventId?: string,
}

export default function EventForm({userId, type, event, eventId}: EventFormProps) {
  const [ files, setFiles ] = useState<File[]>([])
  const [startDate, setStartDate] = useState(new Date());
  const [freeEntry, setFreeEntry] = useState(false);
  const router = useRouter()

  console.log(event);
  const populatedValues = {
    ...event,
    category: event?.category._id,
    startDateTime: new Date(event?.startDateTime),
    endDateTime: new Date(event?.endDateTime),
    categoryId: event?.category._id,
  }
  const initialValues = eventDefaultValues
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: event && type == 'Update' ? populatedValues : initialValues
  })
  event && type == 'Update' ? console.log(populatedValues) : console.log(form.getValues())

  const { startUpload } = useUploadThing('imageUploader')

  useEffect(() => {
    console.log(form.getValues("isFree"));
    freeEntry && form.setValue("price", '0')
  }, [freeEntry, form]);
  
  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values)
    let uploadedImageUrl = values.imageUrl;

    if(files.length > 0)  {
      const uploadedImages = await startUpload(files)

      if(!uploadedImages) {
        return
      }

      uploadedImageUrl = uploadedImages[0].url
    }

    if(type === 'Create') {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl }, 
          userId,
          path: '/profile'
        })

        if(newEvent) {
          form.reset()
          router.push(`/events/${newEvent._id}`)
        }
      } catch (error) {
        }
    }

    if(type === 'Update') {
      if(!eventId) {
        router.back();
        return;
      }
      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: event?._id }, 
          path: `/events/${eventId}`
        })

        if(updatedEvent) {
          form.reset()
          router.push(`/events/${updatedEvent._id}`)
        }
      } catch (error) {
        }
    }
  }

  console.log(form.getValues());
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className="form-group">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel className="pl-2">Event</FormLabel>
              <FormControl>
                <Input className="input-field" placeholder="Event Title" {...field} />
              </FormControl>
              <FormMessage className=" pl-2"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel className="pl-2">Category</FormLabel>
              <FormControl>
                <DropDown onChangeHandler={field.onChange} value={field.value}/>
              </FormControl>
              <FormMessage className=" pl-2"/>
            </FormItem>
          )}
        />
      </div>

      <div className="form-group">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel className="pl-2">Description</FormLabel>
              <FormControl className="h-52">
                <Textarea className="textarea rounded-2xl" placeholder="Description" {...field} />
              </FormControl>
              <FormMessage className=" pl-2"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel className="pl-2">Event Image</FormLabel>
              <FormControl>
                <FileUploader onFieldChange={field.onChange} imageUrl={field.value} setFiles={setFiles} />
              </FormControl>
              <FormMessage className=" pl-2"/>
            </FormItem>
          )}
        />
      </div>

      <div className="form-group">
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel className="pl-2 ">Location</FormLabel>
              <FormControl>
                <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 pl-4">
                  <IoLocationOutline size={20} color="#646464"/>
                  <Input className="bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full 
                  p-regular-16 pl-3 pr-4 py-3 border-none focus-visible:ring-transparent" placeholder={"Location"} {...field} />
                </div>
              </FormControl>
              <FormMessage className=" pl-2"/>
            </FormItem>
          )}
        />
      </div>

      <div className="form-group">
        <FormField
          control={form.control}
          name="startDateTime"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel className="pl-2 ">Start Date</FormLabel>
              <FormControl>
                <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 pl-4">
                  <div className="flex gap-[0.8rem] items-center">
                    <IoCalendarOutline size={20} color="#646464"/>
                    <p className="text-nowrap text-[#757575]">Start Date</p>
                  </div>
                  <DatePicker selected={field.value} onChange={(date: Date | null) => field.onChange(date)} 
                  showTimeSelect timeInputLabel="Time:" dateFormat={"MM/dd/yyyy h:mm aa"} wrapperClassName="datePicker"/>
                </div>
              </FormControl>
              <FormMessage className=" pl-2"/>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endDateTime"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel className="pl-2 ">End Date</FormLabel>
              <FormControl>
                <div className="flex items-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 pl-4">
                  <div className="flex gap-[0.8rem] items-center">
                    <IoCalendarOutline size={20} color="#646464"/>
                    <p className="text-nowrap text-[#757575]">End Date</p>
                  </div>
                  <DatePicker selected={field.value} onChange={(date: Date | null) => field.onChange(date)} 
                  showTimeSelect timeInputLabel="Time:" dateFormat={"MM/dd/yyyy h:mm aa"} wrapperClassName="datePicker"/>
                </div>
              </FormControl>
              <FormMessage className=" pl-2"/>
            </FormItem>
          )}
        />      
      </div>

      <div className="form-group">

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel className="pl-2 ">Price</FormLabel>
              <FormControl>
                <div className="flex items-center justify-between h-[54px] w-full overflow-hidden rounded-full bg-grey-50 pl-4 pr-2">
                   {/* { !freeEntry ?   */}
                    <div className={`flex items-center justify-between`}>
                      <FaDollarSign size={20} color={freeEntry ? "#adb5c0" : "#646464"} 
                      className={` hover:${freeEntry ? "cursor-not-allowed" : "cursor-auto"}`}/>
                      <Input {...field} type="number" className="p-regular-16 border-0 bg-grey-50 outline-offset-0 
                      focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" placeholder="Price" 
                      disabled={freeEntry}/> 
                    </div> 
                  {/* //      :
                  //     <div className="flex items-center gap-3 text-[#adb5c0]">
                  //       <FaDollarSign size={20} color="#adb5c0"/>
                  //       <span>0</span>
                  //     </div>
                  // }  */}

                  <FormField
                    control={form.control}
                    name="isFree"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex items-center">
                            <label htmlFor="isFree" className="text-sm translate-y-[1px] whitespace-nowrap pr-3 leading-none 
                            peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:text-base">Free Entry</label>
                            <Checkbox id="isFree" className="mr-2 size-[0.85rem] border-2 border-primary-500 sm:size-4" 
                            onCheckedChange={ (e) => (field.onChange(e), setFreeEntry(!freeEntry))} checked={field.value}/>
                          </div>
                        </FormControl>
                        <FormMessage className=" pl-2"/>
                      </FormItem>
                    )}
                  /> 
                </div>
              </FormControl>
              
              <FormMessage className=" pl-2"/>
            </FormItem>
          )}
        /> 

        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full ">
              <FormLabel className="pl-2 ">Link</FormLabel>
              <FormControl>
                <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 pl-4">
                  <HiLink size={20} color="#646464"/>
                  <Input className="bg-grey-50 h-[54px] focus-visible:ring-offset-0 placeholder:text-grey-500 rounded-full 
                  p-regular-16 pl-3 pr-4 py-3 border-none focus-visible:ring-transparent" placeholder={"Url"} {...field} />
                </div>
              </FormControl>
              <FormMessage className=" pl-2"/>
            </FormItem>
          )}
        />
      </div>

      <Button className="button col-span-2 w-full" size="lg" type="submit" disabled={form.formState.isSubmitting}>
        { form.formState.isSubmitting ? type === "Create" ? "Creating..." : "Updating..." : `${type} Event` }
      </Button>
    </form>
  </Form>
  )
}
