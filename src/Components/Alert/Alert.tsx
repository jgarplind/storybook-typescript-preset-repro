import * as React from 'react'
import classnames from 'classnames'
import s from './Alert.module.scss'

const Alert = ({
  testSelector,
  customClass,
  title,
}: {
  testSelector?: string
  customClass?: string
  title?: string
}) => (
  <div className={classnames(s.Alert, customClass)} data-testid={testSelector}>
    <div className={s.Content}>
      <p>
        <strong>{title}</strong>
      </p>
    </div>
  </div>
)

export default Alert
