import { useEffect, useState } from "react";

const WaveVoice = () => {
  const [waveHeight, setWaveHeight] = useState(15);
  const [palse1, setPalse1] = useState(true);
  const [waveHeight1, setWaveHeight1] = useState(15);
  const [palse2, setPalse2] = useState(true);
  const [waveHeight2, setWaveHeight2] = useState(15);
  const [palse3, setPalse3] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      if (palse1) {
        setWaveHeight(waveHeight + 5);
      } else {
        setWaveHeight(waveHeight - 5);
      }
      if (waveHeight == 40) {
        setPalse1(false);
      }
      if (waveHeight <= 15) {
        setPalse1(true);
      }
    }, 40);
  }, [palse1, waveHeight]);
  useEffect(() => {
    setTimeout(() => {
      if (palse2) {
        setWaveHeight1(waveHeight1 + 5);
      } else {
        setWaveHeight1(waveHeight1 - 5);
      }
      if (waveHeight1 == 30) {
        setPalse2(false);
      }
      if (waveHeight1 <= 8) {
        setPalse2(true);
      }
    }, 25);
  }, [palse2, waveHeight1]);
  useEffect(() => {
    setTimeout(() => {
      if (palse3) {
        setWaveHeight2(waveHeight2 + 5);
      } else {
        setWaveHeight2(waveHeight2 - 5);
      }
      if (waveHeight2 == 35) {
        setPalse3(false);
      }
      if (waveHeight2 <= 8) {
        setPalse3(true);
      }
    }, 55);
  }, [palse3, waveHeight2]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: 0,
        justifyContent: "center",
        alignItems: "center",
        gap: 7,
      }}
    >
      {/* <div
        style={{
          width: 5,
          height: waveHeight,
          backgroundColor: "white",
          borderRadius: 200,
        }}
      /> */}
      <div
        style={{
          width: 8,
          height: waveHeight1,
          backgroundColor: "white",
          borderRadius: 200,
        }}
      />
      <div
        style={{
          width: 8,
          height: waveHeight2,
          backgroundColor: "white",
          borderRadius: 200,
        }}
      />
      <div
        style={{
          width: 8,
          height: waveHeight1,
          backgroundColor: "white",
          borderRadius: 200,
        }}
      />
      {/* <div
        style={{
          width: 5,
          height: waveHeight,
          backgroundColor: "white",
          borderRadius: 200,
        }}
      /> */}
    </div>
  );
};
export default WaveVoice;
