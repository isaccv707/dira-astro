interface MapProps {
    src: string
}

const Map = ({src}:MapProps) => {
    return (
        <iframe
            src={src}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
    )
}

export default Map
