export function onActionDropdownItemClick<T> ({action, itemData}: {action: FDSAction, itemData: T}) {
    if(action.target === 'event') {
        Liferay.fire(action.id, {itemData})
    }
}


interface FDSAction {
    target: "event" | "async";
    id: string;
}