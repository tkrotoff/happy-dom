import DOMException from '../../exception/DOMException';
import HTMLCollection from '../element/HTMLCollection';
import IHTMLSelectElement from './IHTMLSelectElement';
import IHTMLOptionElement from '../html-option-element/IHTMLOptionElement';
import IHTMLOptionsCollection from './IHTMLOptionsCollection';

/**
 * HTML Options Collection.
 *
 * Reference:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLOptionsCollection.
 */
export default class HTMLOptionsCollection
	extends HTMLCollection<IHTMLOptionElement>
	implements IHTMLOptionsCollection
{
	private _selectElement: IHTMLSelectElement;

	/**
	 *
	 * @param selectElement
	 */
	constructor(selectElement: IHTMLSelectElement) {
		super();

		this._selectElement = selectElement;
	}

	/**
	 * Returns selectedIndex.
	 *
	 * @returns SelectedIndex.
	 */
	public get selectedIndex(): number {
		return this._selectElement.selectedIndex;
	}

	/**
	 * Sets selectedIndex.
	 *
	 * @param selectedIndex SelectedIndex.
	 */
	public set selectedIndex(selectedIndex: number) {
		this._selectElement.selectedIndex = selectedIndex;
	}

	/**
	 * Returns item by index.
	 *
	 * @param index Index.
	 */
	public item(index: number): IHTMLOptionElement {
		return this[index];
	}

	/**
	 *
	 * @param element
	 * @param before
	 */
	public add(element: IHTMLOptionElement, before?: number | IHTMLOptionElement): void {
		if (!before && before !== 0) {
			this._selectElement.ownerDocument['_disableInsertParentValidation'] = true;
			this._selectElement.appendChild(element);
			this._selectElement.ownerDocument['_disableInsertParentValidation'] = false;
			return;
		}

		if (!Number.isNaN(Number(before))) {
			if (<number>before < 0) {
				return;
			}

			this._selectElement.ownerDocument['_disableInsertParentValidation'] = true;
			this._selectElement.insertBefore(element, this[<number>before]);
			this._selectElement.ownerDocument['_disableInsertParentValidation'] = false;
			return;
		}

		const index = this.indexOf(before);

		if (index === -1) {
			throw new DOMException(
				"Failed to execute 'add' on 'DOMException': The node before which the new node is to be inserted is not a child of this node."
			);
		}

		this._selectElement.ownerDocument['_disableInsertParentValidation'] = true;
		this._selectElement.insertBefore(element, this[index]);
		this._selectElement.ownerDocument['_disableInsertParentValidation'] = false;
	}

	/**
	 * Removes indexed element from collection.
	 *
	 * @param index Index.
	 */
	public remove(index: number): void {
		if (this[index]) {
			this._selectElement.removeChild(<IHTMLOptionElement>this[index]);
		}
	}
}
