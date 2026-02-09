import type { DRAWERS } from "../components/react/drawer/drawers";
import { useDrawer, type DrawerPropsType } from "../contexts/DrawerContext"


const useDrawerManager = () => {
    const { closeDrawer, openDrawerByKey } = useDrawer();
    return {
        open: (key: keyof typeof DRAWERS, props: DrawerPropsType) =>
            openDrawerByKey(key, props),
        close: (id: string) => closeDrawer(id),
    }
}

export default useDrawerManager
