import {Expose} from "class-transformer";

export class Business {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id: number;

    @Expose({name: 'businessName'})
    private _businessName: string;

    @Expose({name: 'category'})
    private _category: string;

    @Expose({name: 'subCategory'})
    private _subCategory?: string;

    @Expose({name: 'description'})
    private _description: string;

    @Expose({name: 'active'})
    private _active: boolean;

    constructor(id: number, businessName: string, category: string, subCategory: string, description: string, active: boolean) {
        this._id = id;
        this._businessName = businessName;
        this._category = category;
        this._subCategory = subCategory;
        this._description = description;
        this._active = active;
    }

    get businessName(): string {
        return this._businessName;
    }

    set businessName(value: string) {
        this._businessName = value;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get subCategory(): string {
        return <string>this._subCategory;
    }

    set subCategory(value: string) {
        this._subCategory = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }
}
