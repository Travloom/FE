'use client'

import Script from "next/script";
import { useEffect, useState } from "react";

const MapContent = () => {

  const [isReady, setIsReady] = useState(false);

  const initMap = (x: number, y: number) => {
    if (typeof window === 'undefined' || !window.naver) return;

    var map = new naver.maps.Map("map", {
      center: new naver.maps.LatLng(x, y),
      zoom: 15
    });

    var mapMarker = new naver.maps.Marker({
      position: new naver.maps.LatLng(x, y),
      map: map
    });
  };

  useEffect(() => {

    if (!isReady) return;

    const drawMap = () => {
      if (isReady && typeof window !== 'undefined' && window.naver?.maps?.Service) {
        naver.maps.Service.geocode(
          {
            query: "동소문로 32길 7-7",
          },
          function (status, response) {
            if (status === naver.maps.Service.Status.ERROR) {
              return alert("에러");
            }

            console.log(response)

            const result = response.v2.addresses[0];
            const x = Number(result.x);
            const y = Number(result.y);

            initMap(y, x);
          }

        )
      } else {
        setTimeout(drawMap, 100);
      }
    }
    drawMap();

  }, [isReady]);

  return (
    <>
      <Script
        type="text/javascript"
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_MAP_CLIENT_KEY}&submodules=geocoder`}
        onLoad={() => setIsReady(true)} />
      {/* 준비가 되면 initMap 실행 */}
      <div id={'map'} className={`w-full h-[500px]`}>
      </div>
    </>
  );
}

export default MapContent;