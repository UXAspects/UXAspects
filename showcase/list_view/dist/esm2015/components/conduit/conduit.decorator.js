/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { defaultConduitProps } from './interfaces/conduit-properties';
/**
 * Expose the property that conduits will be stored in
 */
export const /** @type {?} */ CONDUITS = '_conduits';
/**
 * Create the conduit property decorator
 * @param {?} properties
 * @return {?}
 */
export function Conduit(properties) {
    return (target, propertyKey) => {
        if (typeof properties === 'function') {
            properties = properties.call(null);
        }
        // if the target does not already have a conduit list then create one
        if (!target.hasOwnProperty(CONDUITS)) {
            Object.defineProperty(target, CONDUITS, { value: [] });
        }
        // add the conduit to the list ensuring all required properties are provided
        target[CONDUITS].push(/** @type {?} */ (Object.assign({}, defaultConduitProps, properties, { target, propertyKey })));
    };
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZHVpdC5kZWNvcmF0b3IuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9jb25kdWl0L2NvbmR1aXQuZGVjb3JhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxPQUFPLEVBQXFCLG1CQUFtQixFQUFFLE1BQU0saUNBQWlDLENBQUM7Ozs7QUFHekYsTUFBTSxDQUFDLHVCQUFNLFFBQVEsR0FBRyxXQUFXLENBQUM7Ozs7OztBQUdwQyxNQUFNLGtCQUFrQixVQUF3QztJQUM1RCxNQUFNLENBQUMsQ0FBQyxNQUFjLEVBQUUsV0FBbUI7UUFFdkMsRUFBRSxDQUFDLENBQUMsT0FBTyxVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUNuQyxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0Qzs7UUFHRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzFEOztRQUdELE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLG1CQUFDLGtCQUFLLG1CQUFtQixFQUFLLFVBQVUsSUFBRSxNQUFNLEVBQUUsV0FBVyxHQUFxQixFQUFDLENBQUM7S0FDNUcsQ0FBQztDQUNMIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZHVpdE1ldGFkYXRhIH0gZnJvbSAnLi9pbnRlcmZhY2VzL2NvbmR1aXQtbWV0YWRhdGEnO1xuaW1wb3J0IHsgQ29uZHVpdFByb3BlcnRpZXMsIGRlZmF1bHRDb25kdWl0UHJvcHMgfSBmcm9tICcuL2ludGVyZmFjZXMvY29uZHVpdC1wcm9wZXJ0aWVzJztcblxuLyoqIEV4cG9zZSB0aGUgcHJvcGVydHkgdGhhdCBjb25kdWl0cyB3aWxsIGJlIHN0b3JlZCBpbiAqL1xuZXhwb3J0IGNvbnN0IENPTkRVSVRTID0gJ19jb25kdWl0cyc7XG5cbi8qKiBDcmVhdGUgdGhlIGNvbmR1aXQgcHJvcGVydHkgZGVjb3JhdG9yICovXG5leHBvcnQgZnVuY3Rpb24gQ29uZHVpdChwcm9wZXJ0aWVzOiBDb25kdWl0UHJvcGVydGllcyB8IEZ1bmN0aW9uKTogUHJvcGVydHlEZWNvcmF0b3Ige1xuICAgIHJldHVybiAodGFyZ2V0OiBPYmplY3QsIHByb3BlcnR5S2V5OiBzdHJpbmcpID0+IHtcblxuICAgICAgICBpZiAodHlwZW9mIHByb3BlcnRpZXMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSBwcm9wZXJ0aWVzLmNhbGwobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiB0aGUgdGFyZ2V0IGRvZXMgbm90IGFscmVhZHkgaGF2ZSBhIGNvbmR1aXQgbGlzdCB0aGVuIGNyZWF0ZSBvbmVcbiAgICAgICAgaWYgKCF0YXJnZXQuaGFzT3duUHJvcGVydHkoQ09ORFVJVFMpKSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBDT05EVUlUUywgeyB2YWx1ZTogW10gfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgdGhlIGNvbmR1aXQgdG8gdGhlIGxpc3QgZW5zdXJpbmcgYWxsIHJlcXVpcmVkIHByb3BlcnRpZXMgYXJlIHByb3ZpZGVkXG4gICAgICAgIHRhcmdldFtDT05EVUlUU10ucHVzaCh7IC4uLmRlZmF1bHRDb25kdWl0UHJvcHMsIC4uLnByb3BlcnRpZXMsIHRhcmdldCwgcHJvcGVydHlLZXkgfSBhcyBDb25kdWl0TWV0YWRhdGEpO1xuICAgIH07XG59XG4iXX0=