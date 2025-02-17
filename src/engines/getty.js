import {findNode} from 'utils/common';
import {setFileInputData, initSearch, sendReceipt} from 'utils/engines';

const engine = 'getty';

async function search({session, search, image, storageIds}) {
  (await findNode('button[class*="SearchByImageButton"]')).click();

  const inputSelector = 'input[type=file][data-testid="drag-drop-input"]';
  const input = await findNode(inputSelector);

  await setFileInputData(inputSelector, input, image);

  await sendReceipt(storageIds);

  input.dispatchEvent(new Event('change', {bubbles: true}));
}

function init() {
  initSearch(search, engine, taskId);
}

init();
