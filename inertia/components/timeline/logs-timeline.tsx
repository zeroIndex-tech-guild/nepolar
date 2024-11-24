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
import { Log } from '~/types/log'

interface TimelineLayoutProps {
  items: Log[]
}

export const LogsTimeline = ({ items = [] }: TimelineLayoutProps) => {
  const timelineItems = items.map((item) => (
    <TimelineItem key={item.id}>
      <TimelineConnector />
      <TimelineHeader>
        <TimelineTime>Day {item.day}</TimelineTime>
        <TimelineIcon />

        <Link href={`logs/${item.id}`}>
          <TimelineTitle className="hover:underline hover:text-primary">{item.title}</TimelineTitle>
        </Link>
      </TimelineHeader>
      <TimelineContent>
        <TimelineDescription className="truncate">{item.content}</TimelineDescription>
      </TimelineContent>
    </TimelineItem>
  ))
  return <Timeline>{timelineItems}</Timeline>
}
