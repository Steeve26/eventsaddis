import * as z from "zod"

export const eventFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters')
  .max(400, 'Description must be no greater than 400 characters'),
  location: z.string().min(3, 'Location must be at least 3 characters')
  .max(400, 'Location must be no greater than 400 characters'),
  imageUrl: z.string(),
  startDateTime: z.date().min(new Date(), "Start date can't be in the past"),
  endDateTime: z.date(),
  categoryId: z.string(),
  price: z.string().default('0'),
  isFree: z.boolean(),
  url: z.string().url(),
}).refine((data) => data.endDateTime > data.startDateTime, {
  message: 'End date and time must be after start date and time',
  path: ['endDateTime'],
}).refine((data) => data.isFree || Number(data.price) >= 1, {
  message: `Price needs to be set if entry isn't free`,
  path: ['price'],
});