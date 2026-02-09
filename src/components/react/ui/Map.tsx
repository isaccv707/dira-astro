interface MapProps {
  src: string;
  height?: string | number; // 👈 opcional: permite personalizar el alto
  rounded?: boolean; // 👈 opcional: bordes redondeados
}

const Map = ({ src, height = 300, rounded = true }: MapProps) => {
  return (
    <div
      className={`w-full overflow-hidden ${
        rounded ? "rounded-xl shadow-md" : ""
      }`}
      style={{ height }}
    >
      <iframe
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación sucursal"
      ></iframe>
    </div>
  );
};

export default Map;
