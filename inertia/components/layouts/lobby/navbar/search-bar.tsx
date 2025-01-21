import { Search } from 'lucide-react'
import { Input } from '~/components/ui/input'

export const SearchBar = () => {
  return (
    <div className="flex items-center">
      <Search className="translate-x-10" />
      <Input placeholder="Search..." className="pl-14" />
    </div>
  )
}
