export default {
    handleSelectedPath: (menu, pathname, to) => {
        return menu.map(item => {
            if (item.items.length) {
                item.items.map(child => {
                    if (child.to === to) {
                        child.isSelected = true;
                        return { ...item, items: child };
                    } else {
                        child.isSelected = false;
                        return { ...item, items: child };
                    }
                })
            } else {
                if (item.to === to) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
            }
            return item;
        });
    }
}