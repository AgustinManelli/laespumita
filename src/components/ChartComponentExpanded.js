import { ColorType, createChart } from "lightweight-charts";
import { useEffect, useRef } from "react";

function ChartComponentExpanded({ chartList }) {
  const chartContainerRef = useRef();

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.solid, color: "rgb(236, 239, 242)" },
      },
      rightPriceScale: {
        visible: true,
        borderVisible: true,
        autoScale: true,
      },
      OverlayPriceScaleOptions: {},
      crosshair: {
        mode: 1,
        vertLine: {
          visible: false,
        },
        horzLine: {
          visible: false,
        },
      },
      grid: {
        vertLines: {
          visible: true,
        },
        horzLines: {
          visible: true,
        },
      },
      timeScale: {
        visible: true,
        barSpacing: 30,
        borderVisible: true,
        secondsVisible: false,
        timeVisible: true,
      },
      handleScroll: true,
      handleScale: true,
      autoSize: true,
    });
    const newSeries = chart.addAreaSeries({
      lineColor: "#008fd2",
      topColor: "#008fd2",
      bottomColor: "rgba(41, 98, 255, 0)",
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
      lineWidth: 2,
    });

    newSeries.setData(chartList);
    return () => [chart.remove()];
  }, [chartList]);

  return (
    <div
      ref={chartContainerRef}
      style={{
        position: "relative",
        width: "calc(100% - 10px)",
        height: "100px",
        padding: "5px",
        borderRadius: "10px",
        backgroundColor: "rgb(236, 239, 242)",
        marginTop: "5px",
      }}
    ></div>
  );
}

export default ChartComponentExpanded;
