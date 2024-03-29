import type { Tag as TagType } from '@/dto/tag.types'

export interface Todo {
  id: number
  title: string
  description: string
  is_finished: boolean
  is_favorite: boolean
  is_deleted: boolean
  tags: TagType[]
  deadline: string
  deadline_type: string
}
