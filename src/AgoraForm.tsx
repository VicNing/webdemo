import { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { Form, Button, Input } from "antd";

interface Props {
  onJoin?: (options: {
    appId: string;
    channel: string;
    token?: string;
  }) => void;
  joined: boolean;
}

export default function AgoraForm(props: Props) {
  const [form] = Form.useForm();

  const onJoinClick = async function () {
    try {
      await form.validateFields();
      const { appId, channel, token } = form.getFieldsValue();
      props.onJoin?.({ appId, channel, token });
    } catch (e) {}
  };

  return (
    <Form form={form}>
      <Form.Item
        label="appId:"
        name="appId"
        extra={
          <p>
            if you don`t know what is your appid, checkout{" "}
            <a
              href="https://docs.agora.io/en/Agora%20Platform/terms?platform=All%20Platforms#a-nameappidaapp-id"
              rel="noreferrer"
              target="_blank"
            >
              this
            </a>
          </p>
        }
        rules={[{ required: true }]}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="token(optional):"
        name="token"
        extra={
          <p>
            If you don`t know what is your token, checkout{" "}
            <a
              href="https://docs.agora.io/en/Agora%20Platform/terms?platform=All%20Platforms#a-namekeyadynamic-key"
              rel="noreferrer"
              target="_blank"
            >
              this
            </a>
          </p>
        }
      >
        <Input></Input>
      </Form.Item>
      <Form.Item
        label="channel:"
        name="channel"
        extra={
          <p>
            If you don`t know what is your channel, checkout{" "}
            <a
              href="https://docs.agora.io/en/Agora%20Platform/terms?platform=All%20Platforms#channel"
              target="_blank"
            >
              this
            </a>
          </p>
        }
        rules={[{ required: true }]}
      >
        <Input></Input>
      </Form.Item>
      <Button type="primary" onClick={onJoinClick} disabled={props.joined}>
        join
      </Button>
      <Button type="primary" disabled={!props.joined}>
        leave
      </Button>
    </Form>
  );
}
