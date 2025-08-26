// _added, _updated, and _deleted will be
//   equal to a persistConfig version
//   (see store.tsx -> persistConfig.version)

// _added: when this was added
// _updated: when this was updated
// _deleted: when this was removed

// _migrationCategory: determines how the updater handles this non-simple object

interface BasicUpdateableItem {
	id: string,
	_added?: number,
	_updated?: number,
	_deleted?: number,
	_migrationCategory?: "tavernNoun" | "tavernModifier" // add more enum options if needed
}

export default BasicUpdateableItem;
