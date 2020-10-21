import { PbState } from "@webiny/app-page-builder/editor/recoil/modules/types";
import { extrapolateContentElementUtil } from "@webiny/app-page-builder/editor/recoil/utils";
import { selectorFamily } from "recoil";
import { contentSelector } from "../../page/selectors/contentSelector";
import { elementByIdSelector } from "./elementByIdSelector";
import { PbElement } from "@webiny/app-page-builder/types";

export const elementWithChildrenByIdSelector = selectorFamily<PbElement | undefined, string>({
    key: "elementWithChildrenByIdSelector",
    get: id => {
        return ({ get }) => {
            const element = get(elementByIdSelector(id));
            if (!element) {
                return undefined;
            }
            const { path } = element;
            const content = get(contentSelector);
            return extrapolateContentElementUtil(content, path);
        };
    }
});
export const getElementWithChildrenById = (state: PbState, id: string): PbElement | undefined => {
    const element = state.elements[id];
    const content = state.page.content;
    if (!element || !content) {
        return undefined;
    }
    return extrapolateContentElementUtil(content, element.path);
};