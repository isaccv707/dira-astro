import useDrawerManager from "../../../hooks/useDrawerManager";
import type { Study } from "../../../interfaces/study.interface";
import Drawer from "./Drawer";

interface StudiesDrawerProps {
    id: string;
    data: Study[];
    title: string;
}

const StudiesDrawer = ({ id, title, data }: StudiesDrawerProps) => {
    const { close } = useDrawerManager();

    return (
        <Drawer
            open={true}
            onClose={() => close(id)}
            title={title}
        >
            {title}
        </Drawer>
    )
}

export default StudiesDrawer
