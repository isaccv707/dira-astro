const COLOR_MAP = {
    "green-primary": {
        container: "bg-green-primary shadow-green-primary/20",
        text: "text-white",
        iconContainer: "bg-white/10 border-white/20",
        decoration: "bg-white/10 group-hover:bg-white/20",
    },
    "green-secondary": {
        container: "bg-green-secondary shadow-green-secondary/20",
        text: "text-white",
        iconContainer: "bg-white/10 border-white/20",
        decoration: "bg-white/10 group-hover:bg-white/20",
    },
    "yellow-primary": {
        container: "bg-yellow-primary shadow-yellow-primary/20",
        text: "text-white",
        iconContainer: "bg-black/10 border-black/10",
        decoration: "bg-white/20 group-hover:bg-white/30",
    },
} as const;

export type BgColorKeys = keyof typeof COLOR_MAP
// Default to green-primary if bgColor is not in map
export const getColorConfig = (bgColor: string = "green-primary") => {
    return COLOR_MAP[bgColor as BgColorKeys] || COLOR_MAP["green-primary"];
};