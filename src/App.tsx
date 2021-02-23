import "./styles.css";
import "antd/dist/antd.css";

import AgoraRTC, { IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { IAgoraRTCClient } from "agora-rtc-sdk-ng";
import { useState, useEffect } from "react";
import AgoraForm from "./AgoraForm";

export default function App() {
  const [client, setClient] = useState<IAgoraRTCClient>();
  const [joined, setJoined] = useState(false);
  const [remoteUsers, setRemoteUsers] = useState<IAgoraRTCRemoteUser[]>([]);

  useEffect(() => {
    const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });
    setClient(client);
  }, []);

  const onJoin = async function (config: {
    appId: string;
    token?: string;
    channel: string;
  }) {
    try {
      const { appId, token, channel } = config;
      await client?.join(appId, channel, token || null);
      setJoined(true);

      const videoTrack = await AgoraRTC.createCameraVideoTrack();
      const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();

      videoTrack.play(
        document.querySelector(
          ".local-container .video-container"
        ) as HTMLElement
      );
      audioTrack.play();
    } catch (e) {}
  };

  const remoteContainers = remoteUsers.map((user) => <div></div>);

  return (
    <div className="App">
      <AgoraForm joined={joined} onJoin={onJoin} />
      {joined && (
        <>
          <div className="local-container">
            <h2>local video()</h2>
            <div className="video-container"></div>
          </div>
        </>
      )}
    </div>
  );
}
