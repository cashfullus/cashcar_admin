import React, { useEffect } from 'react';
import { ReactComponent as CloseSvg } from 'assets/close.svg';
import ModalTemplate, { ModalTemplateHeader } from './ModalTemplate';

interface MapProps {
  onClose?: () => void;
  latitude?: number;
  longitude?: number;
}

const Map: React.FC<MapProps> = ({ onClose, latitude = 33.450701, longitude = 126.570667 }) => {
  useEffect(() => {
    window.kakao.maps.load(() => {
      const container = document.getElementById('map');
      const options = {
        center: new window.kakao.maps.LatLng(latitude, longitude),
        level: 3,
      };
      const map = new window.kakao.maps.Map(container, options);
      const markers = new window.kakao.maps.Marker({
        map: map,
        position: new window.kakao.maps.LatLng(latitude, longitude),
      });
      new window.kakao.maps.MarkerClusterer({
        map,
        markers,
        gridSize: 35,
        minLevel: 6,
        disableClickZoom: true,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ModalTemplate>
      <ModalTemplateHeader style={{ marginBottom: '1.5rem' }}>
        <span>위치 확인</span>
        <CloseSvg style={{ cursor: 'pointer' }} onClick={onClose} />
      </ModalTemplateHeader>
      <div id="map" style={{ width: '100%', height: '30rem', borderRadius: '0.5rem' }}></div>
    </ModalTemplate>
  );
};

export default Map;
