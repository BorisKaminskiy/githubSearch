import { FC, DetailedHTMLProps, HTMLAttributes, ReactElement } from "react"
import cn from 'classnames'
import styles from ""

interface I___Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  name?: string
  }

const ___: FC<I___> = ({ ...props }): ReactElement => {
  return <div className={cn(styles.root)} {...props}></div>;
};

export default______


