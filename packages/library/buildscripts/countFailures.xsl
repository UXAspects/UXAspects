<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="text" indent="yes"/>
  <xsl:template match="/">
    <xsl:value-of select='sum(//testsuite/@failures)'/>
  </xsl:template>
</xsl:stylesheet>
