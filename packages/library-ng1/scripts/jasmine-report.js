#!/usr/bin/env node
/**
 * Produce HTML report from the XML file in target/reports/xml.
 */
const fs = require('fs-extra');
const { basename, resolve } = require('path');
const { cwd } = require('process');

const HtmlReport = require('jasmine-xml2html-converter');

const xmlDirPath = resolve(cwd(), 'target', 'reports', 'xml');
const htmlDirPath = resolve(cwd(), 'target', 'reports', 'html');

fs.ensureDirSync(htmlDirPath);

const xmlFiles = fs.readdirSync(xmlDirPath);
const xmlFile = xmlFiles.find(v => v.endsWith('.xml'));
if (!xmlFile) throw `No report file found.`;

const xmlFilePath = resolve(xmlDirPath, xmlFile);

new HtmlReport().from(xmlFilePath, {
    reportTitle: 'Jasmine Report',
    outputPath: htmlDirPath
});
