import { useLayoutEffect } from "react";
import ensure from "../lib/ensure";

const useStrokeSummonerLpGui = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  leaguePoints: number,
  summonerTier: string
): void => {
  useLayoutEffect(() => {
    if (canvasRef.current && leaguePoints && summonerTier) {
      console.log("strokeSummonerLpGui 실행");
      const ctx = ensure<CanvasRenderingContext2D>(
        canvasRef.current.getContext("2d")
      );
      switch (summonerTier) {
        case "IRON":
          ctx.strokeStyle = "#325173";
          break;
        case "BRONZE":
          ctx.strokeStyle = "#B97452";
          break;
        case "SILVER":
          ctx.strokeStyle = "#9FBDC3";
          break;
        case "GOLD":
          ctx.strokeStyle = "#F1A64E";
          break;
        case "PLATINUM":
          ctx.strokeStyle = "#63b7b4";
          break;
        case "DIAMOND":
          ctx.strokeStyle = "#6F88EE";
          break;
        default:
          ctx.strokeStyle = "white";
      }
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(
        114 / 2,
        114 / 2,
        110 / 2,
        0,
        Math.PI * ((2 * leaguePoints) / 100)
      );
      ctx.stroke();
    }
  }, [canvasRef]);
};

export default useStrokeSummonerLpGui;
