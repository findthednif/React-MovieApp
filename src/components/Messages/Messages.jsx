import { Alert } from 'antd'
export const ErrorMessage = () => {
  return <Alert message="Error" showIcon description={'Movie loading has failed. Please try again.'} type="error" />
}
export const LostNetworkMessage = () => {
  return (
    <Alert
      message="Warning"
      description="You are currently offline. Please check your internet connection."
      type="warning"
      showIcon
    />
  )
}
