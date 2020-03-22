import React from 'react'
import Alert from './Alert'

export default {
  title: 'Components/Alert',
  component: Alert,
}

export const warning = () => (
  <Alert testSelector="alert-selector" title="This is an alert." />
)
