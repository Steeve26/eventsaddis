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
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { createCategory, getCategories } from "@/lib/actions/category.actions"

type DropDownProps = {
  value?: string,
  onChangeHandler?: () => void
}

export default function DropDown({ onChangeHandler, value }: DropDownProps) {
  const [ categories, setCategories ] = useState<ICategory[]>([])
  const [ newCategory, setNewCategory ] = useState<string>('')

  console.log(newCategory);
  console.log(categories);
  
  const handleAddingCategory = () => {
    if(!newCategory.trim()) 
      return
    createCategory({categoryName: newCategory})
    .then((category) => {setCategories(prev => [...prev, category])})
  }

  const fetchCategories = async () => {
    const categoryList = await getCategories()
    console.log(categoryList);
    
    return categoryList
  }

  useEffect(() => {
    fetchCategories().then((categoryList: ICategory[]) => (console.log(categoryList),
     setCategories(categoryList)))
  }, [])
  
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        { categories.length ? 
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
          </SelectGroup> : null
        }

        { categories.length ?
          categories.map((category) => 
            <SelectItem className="select-item p-regular-14" 
            key={category._id} value={category._id}>{category.name}</SelectItem>)
          : null
        }

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex gap-2 items-center w-full rounded-sm py-3 pl-8
           text-primary-500 hover:bg-primary-50 focus:text-primary-500">Create New <HiOutlinePlus size={17}/>
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-white !flex !flex-col">
            <AlertDialogHeader>
              <AlertDialogTitle>Create Category</AlertDialogTitle>
              <Input className="input-field mt-3" type="text" placeholder="New Category" onChange={(e) => setNewCategory(e.target.value)}/>
            </AlertDialogHeader>
            <AlertDialogFooter  className="!flex !flex-col gap-2">
              <AlertDialogAction onClick={() => handleAddingCategory()}>Create</AlertDialogAction>
              <AlertDialogCancel className="!w-full !m-0" >Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </SelectContent>
    </Select>
  )
}
