import { FC, DetailedHTMLProps, HTMLAttributes } from 'react'
import { useNavigate } from 'react-router'
import { useCardsApi } from '~/hooks/useCardsApi'
import { normalizeCardShortData } from '~/utils/normalizeCardShortData'
import { ICardFull } from '~/types/card'
import { Card } from '~/components'
import { Spiner, Typography } from '~/ui'
import cn from 'classnames'
import styles from './CardContainer.module.scss'

interface ICardContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name?: string
}

const CardContainer: FC<ICardContainerProps> = ({ ...props }) => {
  const { data, isFetching } = useCardsApi()
  const navigate = useNavigate()

  const onCardClick = (index: number, id: string | number) => () => {
    navigate(`/project/${id}`, { state: data?.items[index] as ICardFull })
  }

  return (
    <div className={cn(styles.root)} {...props}>
      {isFetching && <Spiner />}
      <div className={cn(styles.container)}>
        {data ? (
          data.items.map((item, index) => (
            <Card
              onClick={onCardClick(index, item.id)}
              cardData={normalizeCardShortData(item)}
              key={item.id}
            />
          ))
        ) : (
          <Typography variant="t30b">Error</Typography>
        )}
      </div>
    </div>
  )
}

export default CardContainer
