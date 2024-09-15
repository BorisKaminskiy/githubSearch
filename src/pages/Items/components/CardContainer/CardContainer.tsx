import { FC, DetailedHTMLProps, HTMLAttributes } from "react"
import { useNavigate } from "react-router"
import { normalizeCardShortData } from '~/utils/normalizeCardShortData'
import { ICardResults, ICardFull } from '~/types/card'
import Card from '~/components/Card/Card'
import cn from "classnames"
import styles from "./CardContainer.module.scss"

interface ICardContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: ICardResults
}

const CardContainer: FC<ICardContainerProps> = ({data, ...props }) => {
  const navigate = useNavigate()

  const onCardClick = (index: number, id: string | number) => () => {
    navigate(`/project/${id}`, { state: data?.items[index] as ICardFull })
  }

  return (
    <div className={cn(styles.root)} {...props}>
      <div className={cn(styles.container)}>
        {data &&
          data.items.map((item, index) => (
            <Card
              onClick={onCardClick(index, item.id)}
              cardData={ normalizeCardShortData(item) }
              key={item.id}
            />
          ))}
      </div>
    </div>
  )
}

export default CardContainer
