"use client"
// import GoogleMapReact from 'google-map-react'; // Removed dependency

const Map = ({ height = 300, defaultProps }) => {
  return (
    <div style={{ height: height, width: '100%' }} className="bg-gray-100 flex items-center justify-center rounded-lg">
      <div className="text-center text-gray-500">
        <div className="text-sm font-medium">Map Component Removed</div>
        <div className="text-xs">Google Maps integration disabled</div>
      </div>
    </div>
  );
};

export default Map;
