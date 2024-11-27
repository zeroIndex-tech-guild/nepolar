import { Badge, BadgeProps } from './badge'

type Props = {
  tags: string[]
  gap?: string
} & BadgeProps

export const TagsDisplay = (props: Props) => {
  const { tags, gap = '2', ...rest } = props
  return (
    <div className={`flex gap-${gap}`}>
      {tags.map((tag) => (
        <Badge key={tag} variant="outline" {...rest}>
          {tag}
        </Badge>
      ))}
    </div>
  )
}
