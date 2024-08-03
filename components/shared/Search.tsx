"use client"

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

interface SearchProps {
  placeholder: string;
}
export default function Search({placeholder}: SearchProps) {
  const [query, setQuery] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const delayDebounceFn: any = setTimeout(() => {
      let newUrl = ''

      if(query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'query',
          value: query
        })
      }
      else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ['query']
        })
      }

      router.push(newUrl, {scroll: false})

      return clearTimeout(delayDebounceFn)
    }, 300)
  }, [query, searchParams, router])

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <IoIosSearch size={24} />
      <Input className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 
      focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0" type="text" placeholder={placeholder} 
      onChange={(e) => setQuery(e.target.value)} />
    </div>
  )
}
