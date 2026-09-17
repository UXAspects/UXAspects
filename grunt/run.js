/*
 * Copyright 2015-2026 Micro Focus or one of its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = {
  'package-library': {
    exec: 'ux-package ./dist/library --output ./target/npm/ux-aspects-ux-aspects.tgz --artifactory',
  },
  'package-docs-library': {
    exec: 'ux-package . --output ./target/npm/ux-aspects-ux-aspects-docs.tgz --artifactory --remove-scripts',
  },
};
