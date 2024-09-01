// _added and _updated will be equal to a persistConfig version (see store.tsx -> persistConfig.version)

interface BasicUpdateableItem {
	id: string,
	_added?: number,
	_updated?: number
}

export default BasicUpdateableItem;
