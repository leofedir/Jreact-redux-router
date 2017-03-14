import createRender from './createRender';
import { map, curentLayer } from './getDataArea';

export default function updateAttribute(ch, popupTemplate) {
    map.infoWindow.hide();
    curentLayer.setInfoTemplate(popupTemplate);
    createRender(curentLayer);
}
