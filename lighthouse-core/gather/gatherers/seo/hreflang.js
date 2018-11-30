/**
 * @license Copyright 2017 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const Gatherer = require('../gatherer');

// TODO(phulce): remove this in favor of ExternalResourceLinks gatherer

class Hreflang extends Gatherer {
  /**
   * @param {LH.Gatherer.PassContext} passContext
   * @return {Promise<LH.Artifacts['Hreflang']>}
   */
  afterPass(passContext) {
    const driver = passContext.driver;

    return driver.querySelectorAll('head link[rel="alternate" i][hreflang]')
      .then(nodes => Promise.all(nodes.map(node =>
          Promise.all([node.getAttribute('href'), node.getAttribute('hreflang')]))
        )
      ).then(attributeValues => attributeValues &&
        attributeValues.map(values => {
          const [href, hreflang] = values;
          return {
            href: href || '',
            hreflang: hreflang || '',
          };
        })
      );
  }
}

module.exports = Hreflang;

