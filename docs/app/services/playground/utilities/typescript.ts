import * as ts from 'typescript';

export function addImportsTransformer(
    imports: ts.ImportDeclaration[]
): ts.TransformerFactory<ts.SourceFile> {
    return () => {
        const visitor: ts.Visitor = node => {
            if (ts.isSourceFile(node)) {
                return ts.factory.updateSourceFile(node, [...imports, ...node.statements]);
            }
        };

        return node => ts.visitNode(node, visitor);
    };
}

export function ngModuleMetadataTransformer(
    property: 'imports' | 'declarations',
    expressions: ts.Expression[]
): ts.TransformerFactory<ts.SourceFile> {
    return context => {
        const visitor: ts.Visitor = node => {
            if (
                ts.isArrayLiteralExpression(node) &&
                node.parent &&
                ts.isPropertyAssignment(node.parent) &&
                node.parent.name.getText() === property
            ) {
                return ts.factory.createArrayLiteralExpression(
                    [...node.elements, ...expressions],
                    true
                );
            }
            return ts.visitEachChild(node, visitor, context);
        };

        return node => ts.visitNode(node, visitor);
    };
}

export function getModuleImportStatement(moduleName: string, forRoot: boolean): ts.Expression {
    const moduleIdentifier = ts.factory.createIdentifier(moduleName);
    return forRoot
        ? ts.factory.createCallExpression(
              ts.factory.createPropertyAccessExpression(
                  moduleIdentifier,
                  ts.factory.createIdentifier('forRoot')
              ),
              undefined,
              []
          )
        : moduleIdentifier;
}

export function getImportDeclaration(
    path: string,
    imports?: string | string[],
    isAlias?: boolean
): ts.ImportDeclaration {
    if (!imports) {
        return ts.factory.createImportDeclaration(
            undefined,
            undefined,
            undefined,
            ts.factory.createStringLiteral(path)
        );
    }

    if (imports instanceof Array) {
        const importSpecifiers = imports.map(_import =>
            ts.factory.createImportSpecifier(undefined, ts.factory.createIdentifier(_import))
        );

        return ts.factory.createImportDeclaration(
            undefined,
            undefined,
            ts.factory.createImportClause(
                false,
                undefined,
                ts.factory.createNamedImports(importSpecifiers)
            ),
            ts.factory.createStringLiteral(path)
        );
    }

    if (isAlias) {
        return ts.factory.createImportDeclaration(
            undefined,
            undefined,
            ts.factory.createImportClause(
                false,
                undefined,
                ts.factory.createNamespaceImport(ts.factory.createIdentifier(imports))
            ),
            ts.factory.createStringLiteral(path)
        );
    }

    return ts.factory.createImportDeclaration(
        undefined,
        undefined,
        ts.factory.createImportClause(false, ts.factory.createIdentifier(imports), undefined),
        ts.factory.createStringLiteral(path)
    );
}

export function getColorServiceImport(colorSet: string): ts.Expression {
    return ts.factory.createCallExpression(
        ts.factory.createPropertyAccessExpression(
            ts.factory.createIdentifier('ColorServiceModule'),
            ts.factory.createIdentifier('forRoot')
        ),
        undefined,
        [
            ts.factory.createPropertyAccessExpression(
                ts.factory.createIdentifier('colorSets'),
                ts.factory.createIdentifier(colorSet)
            ),
        ]
    );
}
