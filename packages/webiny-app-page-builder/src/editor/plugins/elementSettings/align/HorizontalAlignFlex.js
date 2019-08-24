// @flow
import * as React from "react";
import { connect } from "webiny-app-page-builder/editor/redux";
import { compose, withHandlers, withProps } from "recompose";
import { getPlugins } from "webiny-plugins";
import { set } from "dot-prop-immutable";
import { updateElement } from "webiny-app-page-builder/editor/actions";
import { getActiveElement } from "webiny-app-page-builder/editor/selectors";
import { get } from "dot-prop-immutable";
import { ReactComponent as AlignCenterIcon } from "webiny-app-page-builder/editor/assets/icons/format_align_center.svg";
import { ReactComponent as AlignLeftIcon } from "webiny-app-page-builder/editor/assets/icons/format_align_left.svg";
import { ReactComponent as AlignRightIcon } from "webiny-app-page-builder/editor/assets/icons/format_align_right.svg";

// Icons map for dynamic render
const icons = {
    "flex-start": <AlignLeftIcon />,
    center: <AlignCenterIcon />,
    "flex-end": <AlignRightIcon />
};

const HorizontalAlignActionFlex = ({ element, children, alignElement, align }: Object) => {
    const plugin = getPlugins("pb-page-element").find(
        pl => pl.elementType === element.type
    );

    if (!plugin) {
        return null;
    }

    return React.cloneElement(children, { onClick: alignElement, icon: icons[align] });
};

export default compose(
    connect(
        state => ({ element: getActiveElement(state) }),
        { updateElement }
    ),
    withProps(({ element }) => ({
        align: get(element, "data.settings.horizontalAlignFlex") || "flex-start"
    })),
    withHandlers({
        alignElement: ({ updateElement, element, align }) => {
            return () => {
                const alignments = Object.keys(icons);

                const nextAlign = alignments[alignments.indexOf(align) + 1] || "flex-start";

                updateElement({
                    element: set(element, "data.settings.horizontalAlignFlex", nextAlign)
                });
            };
        }
    })
)(HorizontalAlignActionFlex);