import { api, LightningElement } from "lwc";
import { eventTaskIconMap } from "./utilities";
export default class ActivityItem extends LightningElement {
	@api item = {}

    expanded = false

    get type() {
        return this.item?.sob || ''
    }
    get subType() {
        return this.item[this.typeField]
    }
    get typeField() {
        if (this.type == 'event') {
            return 'Subject'
        }
        if (this.type == 'task') {
            return 'TaskSubtype'
        }
        return 'sob'
    }
    get expandedIcon() {
        return this.expanded ? 'utility:chevrondown' : 'utility:chevronright'
    }
    get icon() {
        return eventTaskIconMap.get(this.subType)
    }

    get itemClass() {
        return this.subType === 'Task' ?
            'slds-timeline__item_task' 
        : this.subType === 'Email' ?
            'slds-timeline__item_email'
        : this.subType === 'Call' ?
            'slds-timeline__item_call' 
        : this.subType === 'Meeting' ?
            'slds-timeline__item_event' 
            //fallback 
        : ''
    }
    get itemWrapperClass() {
        return `slds-timeline__item_expandable ${this.itemClass}`
    }

    get subject() {
        return this.item?.Subject || ''
    }
    get dateString() {
        if (this.sob === 'event') {
            return this.item?.StartDateTime || this.item?.CreatedDate
        }
        if (this.sob === 'task') {
            return this.item?.ActivityDate || this.item?.CreatedDate
        }
        return this.item?.CreatedDate
    }

    get description() {
        return this.item?.Description || ''
    }
    handleExpandBtnClick(event) {
        this.expanded = this.expanded ? false : true
    }
}