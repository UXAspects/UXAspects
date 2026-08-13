///
/// Copyright 2015-2026 Micro Focus or one of its affiliates.
///
/// Licensed under the Apache License, Version 2.0 (the "License");
/// you may not use this file except in compliance with the License.
/// You may obtain a copy of the License at
///
///      http://www.apache.org/licenses/LICENSE-2.0
///
/// Unless required by applicable law or agreed to in writing, software
/// distributed under the License is distributed on an "AS IS" BASIS,
/// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and
/// limitations under the License.
///

/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { ConduitMetadata } from './interfaces/conduit-metadata';
import { ConduitProperties, defaultConduitProps } from './interfaces/conduit-properties';

/** Expose the property that conduits will be stored in */
export const CONDUITS = '_conduits';

type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;

/** Create the conduit property decorator */
export function Conduit(properties: ConduitProperties | Function): PropertyDecorator {
  return (target: Object, propertyKey: string) => {
    if (typeof properties === 'function') {
      properties = properties.call(null);
    }

    // if the target does not already have a conduit list then create one
    // eslint-disable-next-line no-prototype-builtins
    if (!target.hasOwnProperty(CONDUITS)) {
      Object.defineProperty(target, CONDUITS, { value: [] });
    }

    // add the conduit to the list ensuring all required properties are provided
    target[CONDUITS].push({
      ...defaultConduitProps,
      ...properties,
      target,
      propertyKey,
    } as ConduitMetadata);
  };
}
