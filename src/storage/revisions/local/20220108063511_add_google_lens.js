import browser from 'webextension-polyfill';

import {isMobile} from 'utils/common';
import {targetEnv} from 'utils/config';

const message = 'Add Google Lens';

const revision = '20220108063511_add_google_lens';
const downRevision = '20211213191049_add_setcontextmenuevent';

const storage = browser.storage.local;

async function upgrade() {
  const changes = {};
  const {engines, disabledEngines} = await storage.get([
    'engines',
    'disabledEngines'
  ]);
  if (!(targetEnv === 'safari' && (await isMobile()))) {
    const newEngines = ['googleLens'];

    if (targetEnv === 'samsung') {
      engines.push('mailru');
      disabledEngines.push('mailru');
    }

    changes.engines = engines.concat(newEngines);
    changes.disabledEngines = disabledEngines.concat(newEngines);
  }

  changes.storageVersion = revision;
  return storage.set(changes);
}

export {message, revision, upgrade};
