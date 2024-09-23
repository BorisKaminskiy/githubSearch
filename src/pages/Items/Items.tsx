import { FC, DetailedHTMLProps, HTMLAttributes } from 'react'
import { useLocation } from 'react-router'
import CardContainer from './components/CardContainer/CardContainer'
import cn from 'classnames'
import styles from './Items.module.scss'

interface IItemsProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name?: string
}

const Items: FC<IItemsProps> = ({ ...props }) => {
  const data = useLocation().state

  return (
    <div className={cn(styles.root)} {...props}>
      <CardContainer data={data} />
    </div>
  )
}

export default Items
