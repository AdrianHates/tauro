const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const initialPosition = { lat: 13.691572420334111, lng: -89.24283361188954 };

const MapView = () => {
  return (
    <div className="w-full h-full relative">
      <iframe
        className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-[calc(100%+5px)] h-[calc(100%+4px)]"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${initialPosition.lat},${initialPosition.lng}`}
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default MapView;
