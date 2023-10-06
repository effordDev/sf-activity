import { api, track, LightningElement } from "lwc";
import getActivity from "@salesforce/apex/ActivityHelper.getActivity";
export default class ActivityMain extends LightningElement {
	@api recordId
	@track sob = {};
    isLoading = false

	connectedCallback() {
		this.fetchActivity();
	}

    get items() {
        return [...this.events, ...this.tasks].sort(this.sortItems)
    }

    get events() {
        return (this.sob?.Events || []).map(item => {
            item.sob = 'event';
            return item
        })
    }
    get tasks() {
        return (this.sob?.Tasks || []).map(item => {
            item.sob = 'task';
            return item
        })
    }
	async fetchActivity() {
		try {
            this.isLoading = true

			console.log(this.recordId);
			this.sob = await getActivity({ recordId: this.recordId });
			console.log(JSON.parse(JSON.stringify(this.items)));
		} catch (error) {
			console.error(error);
		} finally {
            this.isLoading = false
        }
	}
	@api async refreshActivity(id) {
		this.recordId = id
        this.fetchActivity()
	}

    sortItems(a, b) {
        return new Date(getDateFromItem(b)) - new Date(getDateFromItem(a));
    }
}

const getDateFromItem = (a => {
    if (a?.sob === 'event') {
        return a?.StartDateTime || a?.CreatedDate
    }
    if (a?.sob === 'task') {
        return a?.ActivityDate || a?.CreatedDate
    }
})