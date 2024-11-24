import { Link } from '@inertiajs/react'
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineHeader,
  TimelineTitle,
  TimelineIcon,
  TimelineDescription,
  TimelineContent,
  TimelineTime,
} from '~/components/timeline/timeline'

export type TimelineElement = {
  id: number
  title: string
  date: string
  description: string
}

interface TimelineLayoutProps {
  items: TimelineElement[]
}
export const TimelineLayout = ({ items }: TimelineLayoutProps) => {
  const timelineItems = items.map((item) => (
    <TimelineItem>
      <TimelineConnector />
      <TimelineHeader>
        <TimelineTime>{item.date}</TimelineTime>
        <TimelineIcon />

        <Link href="">
          <TimelineTitle className="hover:underline hover:text-primary">{item.title}</TimelineTitle>
        </Link>
      </TimelineHeader>
      <TimelineContent>
        <TimelineDescription>{item.description}</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  ))
  return <Timeline>{timelineItems}</Timeline>
}
