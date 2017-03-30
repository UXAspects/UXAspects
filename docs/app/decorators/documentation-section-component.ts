export const documentationSections: any[] = [];
export const documentationSectionNames = {};

export function DocumentationSectionComponent(identifier: string) {
  return function(target: any) {
  // Save name and type of every component marked @DocumentationSectionComponent
  documentationSections.push(target);
    documentationSectionNames[identifier] = target;
  };
  
}