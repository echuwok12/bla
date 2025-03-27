import "react-native-reanimated";
import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';

function App() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    if (!hasPermission) {
      requestPermission().catch(console.error);
    }
  }, [hasPermission]);

  // Prevent rendering inconsistent hooks
  if (!hasPermission) {
    return <View><Text>Requesting permission...</Text></View>;
  }
  if (device == null) {
    return <View><Text>No Camera Device Found</Text></View>;
  }

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    console.log(`Received ${frame.width}x${frame.height} frame`);
  }, []);

  return (
    <Camera
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      frameProcessor={frameProcessor}
      pixelFormat="rgb"
    />
  );
}

export default App;
