"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { Button } from '../ui/button'
import { formUrlQuery } from '@/lib/utils'

type PaginationProps = {
  urlParamName?: string,
  page: number | string,
  totalPages: number
}

export default function Pagination({urlParamName, page, totalPages}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onClick = (btnType: string) => {
    const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || 'page',
      value: pageValue.toString()
    })

    router.push(newUrl, {scroll: false})
  }

  return (
    <div className='flex gap-2'>
      <Button size='lg' className='w-28' variant="outline" 
        onClick={() => onClick('prev')} disabled={Number(page) <= 1}> 
        Previous
      </Button>

      <Button size='lg' className='w-28' variant="outline" 
        onClick={() => onClick('next')} disabled={Number(page) >= totalPages}> 
        Next
      </Button>
    </div>
  )
}
