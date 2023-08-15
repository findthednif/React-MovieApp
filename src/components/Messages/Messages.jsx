import { Alert, Space } from "antd";
export const ErrorMessage = () => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Alert
        message="Error"
        showIcon
        description={"Movie loading has failed. Please try again."}
        type="error"
      />
    </Space>
  );
};
export const LostNetworkMessage = () => {
  return (
    <Alert
      message="Warning"
      description="You are currently offline. Please check your internet connection."
      type="warning"
      showIcon
    />
  );
};
