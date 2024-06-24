import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { HiOutlinePlus } from "react-icons/hi"

import { ICategory } from "@/lib/database/models/category.model"
import { useState } from "react"
import { Input } from "../ui/input"

type DropDownProps = {
  value?: string,
  onChangeHandler?: () => void
}
export default function DropDown({ onChangeHandler, value }: DropDownProps) {
  const [ categories, setCategories ] = useState<ICategory[]>([
    {
      _id: "1",
      name: 'Hoes',
    },
    {
      _id: "2",
      name: 'Bros',
    },
  ])
  const [ newCategory, setNewCategory ] = useState<string>()
  
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
        </SelectGroup>
        { categories.length ?
          categories.map((category) => 
            <SelectItem className="select-item p-regular-14" 
            key={category._id} value={category._id}>{category.name}</SelectItem>)
          : null
        }

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex gap-2 items-center w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Create New <HiOutlinePlus size={17}/></AlertDialogTrigger>
          <AlertDialogContent className="bg-white !flex !flex-col">
            <AlertDialogHeader>
              <AlertDialogTitle>Create Category</AlertDialogTitle>
              <Input className="input-field mt-3" type="text" placeholder="New Category" onChange={(e) => setNewCategory(e.target.value)}/>
            </AlertDialogHeader>
            <AlertDialogFooter  className="!flex !flex-col gap-2">
              <AlertDialogAction onClick={() => newCategory && setCategories(prev => ([...prev, {_id: (Number(prev[prev.length - 1]._id) + 1).toString(), name: newCategory}]))}>Create</AlertDialogAction>
              <AlertDialogCancel className="!w-full !m-0" >Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </SelectContent>
    </Select>
  )
}
